import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../integrations/supabase/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push('/') // Redirect to home page or dashboard after successful sign in
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  return <div>Loading...</div>
}
