// Mock contact form submission

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactMessage(formData: ContactFormData): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would send an email or store the message in a database
  console.log("Contact form submission:", formData)

  // For demo purposes, always return success
  return true
}

