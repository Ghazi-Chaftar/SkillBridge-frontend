'use client'

import { SubmitHandler } from 'react-hook-form'

import {
  Button,
  Card,
  CardContent,
  Form,
  FormElement,
  Input,
  PhoneInput
} from '@/src/app/shared/components'
import Editor from '@/src/app/shared/components/form/richText/Editor'
import ToggleImageList from '@/src/app/shared/components/toggle/ToggleImageList'
import { Variant } from '@/src/app/shared/constants/enums'
import useCustomForm from '@/src/app/shared/hooks/useCustomForm'

import { AboutTestSchema } from '../schemas'

export const AboutForm: React.FC = () => {
  interface NeedValue {
    id: number
    image: string
    content: string
    label: string
    tip?: string
  }

  type FormData = {
    architectType: string
  }
  const needs_values: NeedValue[] = [
    {
      id: 1,
      content: 'Ascenseur',
      label: 'Ascenseur',
      image: '/images/supplier/smallSkeleton.svg',
      tip: ' Parfait pour présenter des cuisines et autres grands articles avec ampleur'
    },
    {
      id: 2,
      content: 'Escaliers',
      label: 'Escaliers',
      image: '/images/supplier/smallSkeleton.svg',
      tip: ' Parfait pour présenter des cuisines et autres grands articles avec ampleur'
    }
  ]

  const { form, handleSubmit, control } = useCustomForm(AboutTestSchema)

  const onSubmit: SubmitHandler<FormData> = () => {}

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              <FormElement control={control} name='architectType' label='Email'>
                <PhoneInput
                  defaultCountry='FR'
                  placeholder='Enter a phone number'
                  className=''
                />
              </FormElement>
              <FormElement control={control} name='architectType' label='Email'>
                <Input></Input>
              </FormElement>

              <Button type='submit'>Submit</Button>

              <FormElement control={control} name='architectType'>
                <ToggleImageList
                  name='architectType'
                  variant={Variant.Icon}
                  form={form}
                  toggleDataList={needs_values}
                  className=''
                />
              </FormElement>
              <FormElement control={control} name='architectType' label='Email'>
                <Editor
                  setValue={form.setValue}
                  watch={form.watch}
                  name='architectType'
                  placeholder='Write your post here...'
                />
              </FormElement>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
