import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/diensten')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/diensten"!</div>
}
