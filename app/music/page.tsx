// Redirect music to gallery
import { redirect } from 'next/navigation';

export default function MusicRedirect() {
  redirect('/gallery');
}
