import { getUserInitial } from '../utils/userDisplay'

export default function Avatar({ user, size = 40, className = '' }) {
  const initial = getUserInitial(user)
  const dimension = { width: size, height: size, fontSize: Math.round(size * 0.42) }

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt=""
        className={`avatar avatar--image${className ? ` ${className}` : ''}`}
        style={dimension}
      />
    )
  }

  return (
    <div className={`avatar avatar--initial${className ? ` ${className}` : ''}`} style={dimension}>
      {initial}
    </div>
  )
}