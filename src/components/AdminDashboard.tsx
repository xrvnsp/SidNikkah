import { useEffect, useState } from 'react'
import { supabase, RSVPEntry } from '../lib/supabase'

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      fetchRSVPs()
    }
  }, [session])

  const fetchRSVPs = async () => {
    setFetchLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRsvps(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch RSVP entries')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      alert('Registration successful! You can now log in.')
      setIsRegistering(false)
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setRsvps([])
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    try {
      const { error } = await supabase.from('rsvp').delete().eq('id', id)
      if (error) throw error
      setRsvps(rsvps.filter(item => item.id !== id))
    } catch (err: any) {
      alert(err.message || 'Failed to delete entry')
    }
  }

  const exportToCSV = () => {
    if (rsvps.length === 0) return
    const headers = ['Name', 'Phone', 'Guests Count', 'Message', 'Date Submitted']
    const rows = rsvps.map(r => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.guest_count,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      r.created_at ? new Date(r.created_at).toLocaleString() : ''
    ])

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "RSVP_Guest_List.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredRsvps = rsvps.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery) ||
    (r.message && r.message.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalGuests = rsvps.reduce((acc, curr) => acc + curr.guest_count, 0)

  return (
    <div className="min-h-screen bg-primary-950 text-white flex flex-col justify-start py-12 px-6 relative overflow-hidden font-sans">
      {/* Decorative gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-800/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8 border-b border-primary-800 pb-5">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gold-300">RSVP Administration</h1>
            <p className="text-primary-300 text-xs mt-1">Nikkah of Sidhiq & Sheerin</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.location.href = window.location.origin}
              className="text-primary-300 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg border border-primary-800 hover:bg-primary-900/50"
            >
              Back to Site
            </button>
            {session && (
              <button 
                onClick={handleLogout}
                className="bg-red-900/50 hover:bg-red-900 border border-red-700 text-red-200 text-sm px-3 py-1.5 rounded-lg transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/40 border border-red-700/50 text-red-200 px-4 py-3 rounded-xl text-sm flex justify-between items-center animate-pulse">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white font-bold ml-2">×</button>
          </div>
        )}

        {/* Authentication Card */}
        {!session ? (
          <div className="max-w-md mx-auto mt-16 bg-primary-900/40 backdrop-blur-md border border-primary-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="font-serif text-xl font-bold text-center text-gold-300 mb-6">
              {isRegistering ? 'Create Admin Account' : 'Admin Sign In'}
            </h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
              <div>
                <label className="block text-primary-300 text-xs uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-primary-950/80 border border-primary-800 focus:border-gold-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-primary-300 text-xs uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-primary-950/80 border border-primary-800 focus:border-gold-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-primary-950 font-bold rounded-xl shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : isRegistering ? 'Register Account' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-primary-400">
              {isRegistering ? (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setIsRegistering(false)} className="text-gold-300 hover:underline">Sign In</button>
                </p>
              ) : (
                <p>
                  Need to setup your admin user?{' '}
                  <button onClick={() => setIsRegistering(true)} className="text-gold-300 hover:underline">Register Account</button>
                </p>
              )}
            </div>
          </div>
        ) : (
          /* RSVP Dashboard Panel */
          <div className="space-y-6">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-primary-900/30 border border-primary-800/80 rounded-2xl p-5">
                <span className="text-primary-400 text-xs uppercase tracking-wider">Total RSVPs</span>
                <h3 className="font-serif text-3xl font-bold text-gold-300 mt-2">{rsvps.length}</h3>
                <p className="text-[10px] text-primary-500 mt-1">Unique submissions</p>
              </div>
              <div className="bg-primary-900/30 border border-primary-800/80 rounded-2xl p-5">
                <span className="text-primary-400 text-xs uppercase tracking-wider">Total Attending Guests</span>
                <h3 className="font-serif text-3xl font-bold text-gold-300 mt-2">{totalGuests}</h3>
                <p className="text-[10px] text-primary-500 mt-1">Including family members</p>
              </div>
              <div className="bg-primary-900/30 border border-primary-800/80 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-primary-400 text-xs uppercase tracking-wider">Data Actions</span>
                <button 
                  onClick={exportToCSV}
                  disabled={rsvps.length === 0}
                  className="mt-3 w-full py-2 bg-primary-800 hover:bg-primary-700 border border-primary-700 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all disabled:opacity-40"
                >
                  📥 Export to CSV / Excel
                </button>
              </div>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-primary-900/20 border border-primary-800/50 rounded-2xl p-4">
              <div className="w-full sm:w-80 relative">
                <input 
                  type="text" 
                  placeholder="Search by name, phone, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-primary-950/80 border border-primary-850 focus:border-gold-500 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <button 
                onClick={fetchRSVPs}
                disabled={fetchLoading}
                className="py-2.5 px-4 bg-primary-900/80 border border-primary-800 text-primary-200 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                {fetchLoading ? 'Refreshing...' : '🔄 Refresh List'}
              </button>
            </div>

            {/* RSVP Data Table */}
            <div className="bg-primary-900/10 border border-primary-800/60 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary-900/40 border-b border-primary-800/80 text-primary-300 text-xs font-semibold tracking-wider">
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Phone</th>
                      <th className="py-4 px-6 text-center">Guests</th>
                      <th className="py-4 px-6">Wishes / Message</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-900/50 text-xs">
                    {fetchLoading && rsvps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-primary-400 italic">Loading RSVP entries...</td>
                      </tr>
                    ) : filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-primary-400 italic">
                          {searchQuery ? 'No matching RSVPs found.' : 'No RSVPs submitted yet.'}
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((r, idx) => (
                        <tr key={r.id || idx} className="hover:bg-primary-900/20 transition-colors">
                          <td className="py-4 px-6 font-serif font-semibold text-gold-200 text-sm">{r.name}</td>
                          <td className="py-4 px-6 text-primary-300 font-mono">{r.phone}</td>
                          <td className="py-4 px-6 text-center font-bold text-white">
                            <span className="inline-block w-6 h-6 rounded-full bg-primary-800/80 flex items-center justify-center mx-auto border border-primary-700">
                              {r.guest_count}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-primary-200 max-w-xs truncate hover:max-w-none hover:whitespace-normal transition-all" title={r.message}>
                            {r.message || <span className="text-primary-500 italic">— No message</span>}
                          </td>
                          <td className="py-4 px-6 text-primary-400 whitespace-nowrap">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : '—'}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => r.id && handleDelete(r.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-950/50 p-1.5 rounded-lg transition-colors"
                              title="Delete RSVP Entry"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
