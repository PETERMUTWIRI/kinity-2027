// Ticket and code generation utilities

/**
 * Generate a unique ticket code for RSVPs
 * Format: KIN-XXXXX (5 alphanumeric characters)
 */
export function generateTicketCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded similar looking characters
  let code = 'KIN-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generate a contribution reference number
 * Format: KIN-YYYYMMDD-XXXX
 */
export function generateContributionRef(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KIN-${dateStr}-${random}`;
}

/**
 * Generate a volunteer ID
 * Format: VOL-XXXXXX
 */
export function generateVolunteerId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'VOL-';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
