# Profile Store Documentation

## Overview

The Profile Store is a Zustand-based state management solution for managing
mentor profile data throughout the application. It provides centralized state
management with TypeScript support and includes custom hooks for easy
consumption.

## Files Structure

```
src/lib/stores/
├── profileStore.ts          # Main Zustand store
├── hooks/
│   └── useProfile.ts       # Custom hooks for easier consumption
├── examples/
│   └── ExampleProfileComponent.tsx  # Usage example
└── index.ts                # Main exports
```

## Store Features

### State Management

- **Profile Data**: Complete mentor profile information
- **Edit Mode**: Controls whether the profile is in edit mode
- **Loading States**: Manages loading states for async operations
- **Error Handling**: Centralized error state management

### Actions

- **Field Updates**: Update individual profile fields
- **Bulk Updates**: Update specific sections (languages, subjects, etc.)
- **Profile Management**: Load, save, and reset profile data
- **State Controls**: Toggle edit mode, manage loading states

## Usage

### Basic Usage

```typescript
import { useProfileStore } from '@/src/lib/stores'

const MyComponent = () => {
  const { profileData, isEditing, updateField } = useProfileStore()

  return (
    <div>
      <h1>{profileData.firstName} {profileData.lastName}</h1>
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

### Using Custom Hooks (Recommended)

```typescript
import {
  useProfileData,
  useProfileEditing,
  useProfileActions
} from '@/src/lib/stores'

const MyComponent = () => {
  const profileData = useProfileData()
  const { isEditing, setEditing } = useProfileEditing()
  const { updateField } = useProfileActions()

  return (
    <div>
      <h1>{profileData.firstName} {profileData.lastName}</h1>
      <button onClick={() => setEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
    </div>
  )
}
```

## Available Hooks

### `useProfileData()`

Returns the complete profile data object.

### `useProfileEditing()`

Returns editing state and controls:

- `isEditing`: boolean
- `setEditing`: (isEditing: boolean) => void
- `saveProfile`: () => Promise<void>

### `useProfileLoading()`

Returns loading state and error handling:

- `isLoading`: boolean
- `error`: string | null
- `setError`: (error: string | null) => void

### `useProfileActions()`

Returns all profile update functions:

- `updateField`: (field: keyof ProfileData, value: any) => void
- `updateLanguages`: (languages: string[]) => void
- `updateSubjects`: (subjects: string[]) => void
- `updateDegrees`: (degrees: string[]) => void
- `updateLevels`: (levels: string[]) => void
- `updateAvailability`: (availability: string[]) => void
- `updateBio`: (bio: string) => void
- `loadProfile`: (profileData: ProfileData) => void
- `resetProfile`: () => void

## Profile Data Interface

```typescript
interface ProfileData {
  id: string
  firstName: string
  lastName: string
  email: string
  bio: string
  profilePicture: string
  location: string
  hourlyRate: number
  subjects: string[]
  languages: string[]
  experience: number
  rating: number
  totalSessions: number
  teachingMethods: string[]
  levels: string[]
  availability: string[]
  degrees: string[]
}
```

## Store Configuration

### DevTools Support

The store includes Zustand DevTools support for debugging in development:

- Store name: `profile-store`
- Action tracking for all state changes
- Time-travel debugging support

### Persistence (Optional)

The store is configured to support persistence middleware. To enable
localStorage persistence:

```typescript
import { persist } from 'zustand/middleware'

// Add persist middleware to the store configuration
export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set, get) => ({
        // ... store implementation
      }),
      {
        name: 'profile-storage',
        // Optional: customize what gets persisted
        partialize: state => ({
          profileData: state.profileData
          // Don't persist temporary states
        })
      }
    ),
    {
      name: 'profile-store'
    }
  )
)
```

## Best Practices

1. **Use Custom Hooks**: Prefer the custom hooks over direct store access for
   better performance and cleaner code.

2. **Selective State Access**: Only subscribe to the parts of the state you
   need:

   ```typescript
   // Good - only re-renders when firstName changes
   const firstName = useProfileStore(state => state.profileData.firstName)

   // Avoid - re-renders on any profile change
   const { profileData } = useProfileStore()
   ```

3. **Error Handling**: Always handle errors in your components:

   ```typescript
   const { error, setError } = useProfileLoading()

   useEffect(() => {
     if (error) {
       // Handle error (show toast, etc.)
       console.error('Profile error:', error)
     }
   }, [error])
   ```

4. **Loading States**: Show loading indicators during async operations:

   ```typescript
   const { isLoading } = useProfileLoading()

   if (isLoading) {
     return <LoadingSpinner />
   }
   ```

## API Integration

The store includes a `saveProfile` function that simulates an API call. To
integrate with your actual API:

```typescript
// In profileStore.ts
saveProfile: async () => {
  const { profileData } = get()

  try {
    set({ isLoading: true, error: null }, false, 'saveProfile:start')

    // Replace with your actual API call
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    })

    if (!response.ok) {
      throw new Error('Failed to save profile')
    }

    set({ isEditing: false, isLoading: false }, false, 'saveProfile:success')
  } catch (error) {
    set(
      {
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to save profile'
      },
      false,
      'saveProfile:error'
    )
  }
}
```

## Testing

The store can be easily tested using Zustand's testing utilities:

```typescript
import { act, renderHook } from '@testing-library/react'
import { useProfileStore } from '@/src/lib/stores'

describe('ProfileStore', () => {
  beforeEach(() => {
    useProfileStore.getState().resetProfile()
  })

  it('should update profile field', () => {
    const { result } = renderHook(() => useProfileStore())

    act(() => {
      result.current.updateField('firstName', 'John')
    })

    expect(result.current.profileData.firstName).toBe('John')
  })
})
```
