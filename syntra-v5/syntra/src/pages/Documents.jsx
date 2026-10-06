import { useState } from 'react'
import { LayoutGrid, List, Star, FileText, Trash2 } from 'lucide-react'
import { Button, Card, Badge, Avatar, PageHeader, Input, Select, Modal, Skeleton, Empty } from '@/components/ui'
import { useLoading } from '@/hooks/useLoading'
import { useApp } from '@/context/AppContext'
import { documents, users } from '@/data'
import { cn } from '@/utils/cn'

const extra = { 1: ['4.2 MB', 'Website Redesign', 5], 2: ['180 KB', 'Mobile App v2', 4], 3: ['96 KB', 'Q4 Campaign', 1], 4: ['64 KB', 'Billing Revamp', 3] }

export default function Documents() {
  const { toast } = useApp()
  const loading = useLoading()
  const [list, setList] = useState(documents)
  const [q, setQ] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('recent')
  const [grid, setGrid] = useState(true)
  const [favs, setFavs] = useState([2])
  const [prev, setPrev] = useState(null)

  const shown = list.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) && (type === 'All' || d.type === type))
    .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : extra[b.id][2] - extra[a.id][2]))
  const fav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  const Item = ({ d }) => (
    <Card className="flex items-center gap-3 p-3">
      <button onClick={() => setPrev(d)} className="flex flex-1 items-center gap-3 text-left"><FileText size={20} className="text-fg-subtle" /><span><span className="block text-ui">{d.name}</span><span className="text-caption text-fg-subtle">{extra[d.id][0]} · {extra[d.id][1]} · {d.updated}</span></span></button>
      <Badge>{d.type}</Badge>
      <button onClick={() => fav(d.id)} aria-label="Favorite"><Star size={15} className={favs.includes(d.id) ? 'fill-current text-primary' : 'text-fg-faint'} /></button>
    </Card>
  )

  return (
    <>
      <PageHeader title="Documents" sub="▲ Library" action={<Button onClick={() => toast('Upload simulated', 'info')}>Upload</Button>} />
      <div className="mb-4 flex flex-wrap gap-2">
        <Input className="max-w-xs" placeholder="Search documents…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={type} onChange={(e) => setType(e.target.value)}>{['All', 'PDF', 'Doc', 'Sheet'].map((t) => <option key={t}>{t}</option>)}</Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Recent</option><option value="name">Name</option></Select>
        <Button variant="ghost" onClick={() => setGrid(!grid)} aria-label="Toggle view">{grid ? <List size={14} /> : <LayoutGrid size={14} />}</Button>
      </div>
      {loading ? <div className="grid gap-3 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        : shown.length === 0 ? <Empty text="Your files will live here." />
        : <div className={cn('grid gap-3', grid && 'md:grid-cols-2')}>{shown.map((d) => <Item key={d.id} d={d} />)}</div>}

      <Modal open={!!prev} onClose={() => setPrev(null)} title={prev?.name}>
        {prev && (
          <div>
            <div className="mb-4 space-y-2 rounded-md bg-canvas p-5">{[90, 70, 85, 55, 78].map((w, i) => <div key={i} className="h-2 rounded-full bg-border" style={{ width: `${w}%` }} />)}</div>
            <p className="flex items-center gap-2 text-ui text-fg-muted"><Avatar size={20} name={users.find((u) => u.id === prev.owner).name} />{extra[prev.id][1]} · {extra[prev.id][0]}</p>
            <div className="mt-4 flex gap-2"><Button onClick={() => toast('Download started', 'info')}>Download</Button><Button variant="ghost" onClick={() => { setList(list.filter((x) => x.id !== prev.id)); setPrev(null); toast('Document deleted', 'warning') }}><Trash2 size={14} />Delete</Button></div>
          </div>
        )}
      </Modal>
    </>
  )
}
