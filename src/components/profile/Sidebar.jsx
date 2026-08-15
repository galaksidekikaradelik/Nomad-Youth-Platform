import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { NAV_ITEMS } from '../../utils/profileHelpers';
import { LogOut, Pencil, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function Sidebar({ activeView, onNavigate, collapsed, onToggleCollapse }) {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate('/');
    }
  };

  return (
    <aside className={`profile-sidebar${collapsed ? ' profile-sidebar--collapsed' : ''}`}>
      <button
        type="button"
        className="profile-sidebar__toggle"
        onClick={onToggleCollapse}
        aria-label={collapsed ? t('profile_sidebar_open_aria') : t('profile_sidebar_close_aria')}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {user && !user.profileCompleted && (
        <div
          className="profile-sidebar__complete-card"
          title={collapsed ? (t('profile_complete_card_title') || 'Profilinizi tamamlayın') : undefined}
        >
          {!collapsed && (
            <p className="profile-sidebar__complete-text">
              {t('profile_complete_card_title') || 'Profilinizi tamamlayın'}
            </p>
          )}
          <button
            type="button"
            className="profile-sidebar__complete-btn"
            onClick={() => navigate('/profile-setup')}
          >
            {collapsed ? <Pencil size={16} /> : (t('profile_complete_card_btn') || 'Profili tamamla')}
          </button>
        </div>
      )}

      <nav className="profile-sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeView;
          const label = t(item.labelKey);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`profile-sidebar__item${isActive ? ' profile-sidebar__item--active' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <button
        className="profile-sidebar__item profile-sidebar__item--logout"
        onClick={handleLogout}
        title={collapsed ? t('nav_logout') : undefined}
      >
        <LogOut size={18} />
        <span>{t('nav_logout')}</span>
      </button>
    </aside>
  );
}