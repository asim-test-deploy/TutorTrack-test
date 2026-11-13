const loginEndpoint = 'http://localhost:3000/api/auth/login'
// Replace this URL with the signup endpoint provided by your backend.
const registerEndpoint = 'http://localhost:3000/api/auth/register'

export async function login(credentials) {
  const response = await fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  const responseText = await response.text()
  let responseData = {}

  if (responseText) {
    try {
      const parsedResponse = JSON.parse(responseText)
      responseData =
        parsedResponse && typeof parsedResponse === 'object' ? parsedResponse : {}
    } catch {
      responseData = {}
    }
  }

  if (!response.ok) {
    throw new Error(
      responseData.message ||
        responseData.error ||
        `Login failed with status ${response.status}.`,
    )
  }

  return responseData
}

export async function register(registrationDetails) {
  const response = await fetch(registerEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationDetails),
  })

  const responseText = await response.text()
  let responseData = null

  if (responseText) {
    try {
      responseData = JSON.parse(responseText)
    } catch {
      if (response.ok) {
        throw new Error('Signup returned an invalid response from the server.')
      }
    }
  }

  if (!response.ok) {
    const responseMessage =
      responseData && typeof responseData === 'object'
        ? responseData.message || responseData.error
        : ''
    throw new Error(
      responseMessage || `Signup failed with status ${response.status}.`,
    )
  }

  if (responseText && (!responseData || typeof responseData !== 'object')) {
    throw new Error('Signup returned an invalid response from the server.')
  }

  return responseData
}
