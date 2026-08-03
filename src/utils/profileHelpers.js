import {
  LayoutGrid,
  Send,
  Bookmark,
  Bell,
  Settings as SettingsIcon,
} from 'lucide-react';

export function getDaysLeft(deadline) {
  if (!deadline) return null;
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

export function timeAgo(isoDate) {
  if (!isoDate) return '';
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'indicə';
  if (mins < 60) return `${mins} dəq əvvəl`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat əvvəl`;
  const days = Math.floor(hours / 24);
  return `${days} gün əvvəl`;
}

export const NAV_ITEMS = [
  { key: 'overview', labelKey: 'profile_nav_overview', icon: LayoutGrid },
  { key: 'applications', labelKey: 'profile_nav_applications', icon: Send },
  { key: 'saved', labelKey: 'profile_nav_saved', icon: Bookmark },
  { key: 'notifications', labelKey: 'profile_nav_notifications', icon: Bell },
  { key: 'settings', labelKey: 'profile_nav_settings', icon: SettingsIcon },
];