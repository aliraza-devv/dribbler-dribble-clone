"use client"
import { SessionInterface } from "@/common.types"
import { ChangeEvent, useState } from 'react';
import Image from 'next/image'
import FormField from "./FormField"
import CustomMenu from "./CustomMenu"
import { categoryFilters } from "@/constants"
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string,
  session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken()

    try {
      if(type === 'create') {
        // Create Project
        await createNewProject(form, session?.user?.id, token)

        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if(!file) return;

    if(!file.type.includes('image')) {
      return alert('Please Upload an image.');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string

      handleStateChange('image', result)
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: ''
  })


  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label" >
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <FormField
        title='Title'
        state={form.title}
        placeholder='Dribbler'
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title='Description'
        state={form.description}
        placeholder='Dribbler'
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://www.alirazaa.dev/'
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title='GitHub URL'
        state={form.githubUrl}
        placeholder='https://www.github.com/aliraza-devv'
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      {/* Custom input for category */}

      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
          <Button
            title={
              isSubmitting ? 
              `${type === 'Create' ? 'Creating' : 'Editing'}` : 
              `${type === 'create' ? 'Create' : 'Edit'}`}
            type='submit'
            leftIcon={isSubmitting ? "" : '/plus.svg'}
            rightIcon={isSubmitting ? "" : '/plus.svg'}
            isSubmitting={isSubmitting}
          />
      </div>
    </form>
  )
}

export default ProjectForm