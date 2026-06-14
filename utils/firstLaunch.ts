const FIRST_LAUNCH_KEY = 'daigou_first_launch'

export function isFirstLaunch(): boolean {
  return !localStorage.getItem(FIRST_LAUNCH_KEY)
}

export function markAsLaunched(): void {
  localStorage.setItem(FIRST_LAUNCH_KEY, 'true')
}

export function resetFirstLaunch(): void {
  localStorage.removeItem(FIRST_LAUNCH_KEY)
}
