export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (
      !name ||
      !email ||
      !message ||
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      name.trim() === '' ||
      email.trim() === '' ||
      message.trim() === ''
    ) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log the contact form submission (in production, would send email)
    console.log('Contact form submission:', {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return Response.json(
      { success: true, message: 'Message received successfully' },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
