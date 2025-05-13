import Link from 'next/link'

export default function Home() {
  return (
    <div className='grid justify-center items-center'>
      <Link href="/login" className='text-4xl' >login</Link>
      <Link href="/signup" className='text-4xl'>signup</Link>
      <Link href="/dashboard" className='text-4xl'>dashboard</Link>
    </div>
  );
}
