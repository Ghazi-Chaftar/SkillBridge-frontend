# Simple Profile Store Documentation

## Overview

A simplified Zustand store for managing mentor profile data, following the same
pattern as the architect store. This store provides basic state management
without complex features like loading states or error handling.

## Store Structure

```typescript
interface ProfileState {
  profileData: ProfileData
  isEditing: boolean
  setProfileData: (profileData: ProfileData) => void
  setIsEditing: (isEditing: boolean) => void
  updateField: (field: keyof ProfileData, value: any) => void
}
```

## Usage

### Direct Store Access

```typescript
import { useProfileStore } from '@/src/lib/stores'

const MyComponent = () => {
  const { profileData, isEditing, setIsEditing, updateField } = useProfileStore()

  return (
    <div>
      <h1>{profileData.firstName} {profileData.lastName}</h1>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && (
        <input
          value={profileData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
        />
      )}
    </div>
  )
}
```

### Using Custom Hooks

```typescript
import { useProfileData, useProfileEditing, useProfileActions } from '@/src/lib/stores'

const MyComponent = () => {
  const profileData = useProfileData()
  const { isEditing, setIsEditing } = useProfileEditing()
  const { updateField } = useProfileActions()

  return (
    <div>
      <h1>{profileData.firstName} {profileData.lastName}</h1>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
    </div>
  )
}
```

## Available Methods

- `setProfileData(profileData)` - Replace entire profile data
- `setIsEditing(boolean)` - Toggle edit mode
- `updateField(field, value)` - Update individual field

## Custom Hooks

- `useProfileData()` - Get profile data
- `useProfileEditing()` - Get editing state and controls
- `useProfileActions()` - Get update functions

## Example Implementation

See `src/lib/stores/examples/ExampleProfileComponent.tsx` for a complete usage
example.

This simplified store follows the same pattern as your architect store, making
it easy to understand and maintain.
