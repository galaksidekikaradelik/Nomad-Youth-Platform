import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../hooks/useAuth";
import { updateNotificationSettings } from "../services/notificationService";
import "../style/index.css";

import { EDU_LEVEL_ENUM_MAP } from "../constants/onboardingOptions";
import StepProfile from "../components/onboarding/StepProfile";
import StepPrefs from "../components/onboarding/StepPrefs";
import SuccessPanel from "../components/onboarding/SuccessPanel";

export default function NomadYouthOnboarding() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { completeProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [profile, setProfile] = useState({
    firstName: "", lastName: "", phone: "", country: "", city: "",
    university: "", eduLevel: "", fieldOfStudy: "", dob: "",
  });
  const [errors, setErrors] = useState({});

  const [prefs, setPrefs] = useState({
    countries: [],
    projectTypes: [],
    formats: [],
    categories: [],
    durations: [],
    deadlineReminderDays: 3,
  });
  const [pendingCountry, setPendingCountry] = useState("");

  const setP = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const toggleIn = (arr, val) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  function validateStep1() {
    const e = {};
    if (!profile.firstName.trim()) e.firstName = t("required");
    if (!profile.lastName.trim()) e.lastName = t("required");
    if (!profile.country.trim()) e.country = t("required");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleContinue() {
    if (validateStep1()) setStep(2);
  }

  async function handleFinish() {
    setSubmitError("");
    setSaving(true);
    try {
      const profilePayload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
        country: profile.country,
        city: profile.city,
        university: profile.university,
        educationLevel: EDU_LEVEL_ENUM_MAP[profile.eduLevel] || null,
        major: profile.fieldOfStudy,
        birthDate: profile.dob,
      };

      const notificationSettings = {
        emailNotifications: true,
        inAppNotifications: true,
        newOpportunities: true,
        deadlineReminders: true,
        savedProjectChanges: true,
        platformUpdates: true,
        countries: prefs.countries,
        projectTypes: prefs.projectTypes,
        categories: prefs.categories,
        formats: prefs.formats,
        deadlineReminderDays: prefs.deadlineReminderDays,
        durations: prefs.durations,
      };

      // 1. Profili tamamla
      await completeProfile(profilePayload);

      // 2. Bildiriş ayarlarını ayrıca yadda saxla
      await updateNotificationSettings(notificationSettings);

      setDone(true);
      setTimeout(() => navigate("/profile", { replace: true }), 1200);
    } catch (err) {
      console.error("Profil tamamlanmadı:", err);
      setSubmitError(
        err.response?.data?.message || t("submit_error") || "Xəta baş verdi, yenidən cəhd edin."
      );
    } finally {
      setSaving(false);
    }
  }

  const progressPct = step === 1 ? 50 : 100;

  return (
    <div className="ny-root">
      <div className="ny-stage">
        <div className="ny-card">
          {done ? (
            <SuccessPanel text={t("redirecting_dashboard")} />
          ) : (
            <>
              <div className="ny-progress-wrap">
                <div className="ny-progress-track">
                  <div className="ny-progress-fill" style={{ width: progressPct + "%" }} />
                </div>
                <div className="ny-progress-label">{t(`onboarding_step${step}`)}</div>
              </div>

              <div className="ny-anim-wrap">
                {step === 1 ? (
                  <StepProfile
                    key="s1"
                    t={t}
                    profile={profile}
                    setP={setP}
                    errors={errors}
                    onContinue={handleContinue}
                    onBack={() => navigate("/profile")}
                  />
                ) : (
                  <StepPrefs
                    key="s2"
                    t={t}
                    prefs={prefs}
                    setPrefs={setPrefs}
                    toggleIn={toggleIn}
                    pendingCountry={pendingCountry}
                    setPendingCountry={setPendingCountry}
                    saving={saving}
                    submitError={submitError}
                    onBack={() => setStep(1)}
                    onFinish={handleFinish}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}