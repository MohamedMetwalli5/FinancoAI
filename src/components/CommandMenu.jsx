import { Command } from 'cmdk'
import React from 'react'

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false)

  // Toggling the menu when cmd+K is pressed
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>Settings</Command.Item>
          <Command.Item>Profile</Command.Item>
          <Command.Separator />
          <Command.Item>Contact us</Command.Item>
        </Command.Group>

        <Command.Item>Exchange Rates</Command.Item>
      </Command.List>
    </Command.Dialog>
  )
}