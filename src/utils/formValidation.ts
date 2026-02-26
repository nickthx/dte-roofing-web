export function validateRequired(value: string): string | null {
  return value.trim() ? null : 'This field is required';
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Please enter a valid email address';
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? null : 'Please enter a valid 10-digit phone number';
}
