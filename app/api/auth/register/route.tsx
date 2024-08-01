
import { NextResponse } from 'next/server';
import {prisma} from '@/utils/db'

export async function POST( req : Request, res : NextResponse) {
    
    try {
        const { email, password } =await req.json();

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return new NextResponse("This account already exist.", { status : 400})
      }

      const user = await prisma.user.create({
        data : {
            email,
            password
        }
      })

      return NextResponse.json(user);
    } catch (error) {
        console.log(error)
      return new NextResponse("Some error occured." ,{ status : 500 })
    }
};
