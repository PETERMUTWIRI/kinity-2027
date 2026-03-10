// Redirect old blog to news hub
import { redirect } from 'next/navigation';

export default function BlogRedirect() {
  redirect('/news-hub');
}
