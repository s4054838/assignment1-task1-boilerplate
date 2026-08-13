import type { Metadata } from 'next'
import { adminDb } from '@/lib/firebase/admin'
import { TeamMemberCard } from '@/features/team/components/TeamMemberCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { Users } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Team',
}

async function getTeamMembers() {
  const snapshot = await adminDb.collection('teamMembers').orderBy('order', 'asc').get()
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name as string,
      role: data.role as string,
      description: data.description as string,
      photoURL: (data.photoURL ?? null) as string | null,
    }
  })
}

export default async function TeamPage() {
  const members = await getTeamMembers()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team 66</h1>
        <p className="mt-1 text-sm text-zinc-500">Meet the people building this project.</p>
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members yet"
          description="Run the seed script (frontend/scripts/seed-team.mjs) to populate the roster."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}