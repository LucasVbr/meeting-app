import type {NextApiRequest, NextApiResponse} from 'next';
import CRUD from '@/utils/CRUD';
import {CreateUserQuery, DeleteUserQuery} from '@/models/api/user';
import {PrismaClient} from '@prisma/client';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  switch (req.method) {
    case CRUD.CREATE: return createUser(req, res);
    case CRUD.READ: return readUser(req, res);
    // case CRUD.UPDATE: return updateUser(req, res);
    case CRUD.DELETE: return deleteUser(req, res);
    default: return help(res);
  }
}

function help(res: NextApiResponse) {
  res.status(400).send({message: 'error'}); // TODO add help message
}

const prisma = new PrismaClient();

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const {email, password, firstName, lastName} = req.body as CreateUserQuery;

  if (!email || !password || !firstName || !lastName)
    return res.status(400).send({message: req.body});

  const newUser = await prisma.user.create({
    data: {email, password, firstName, lastName},
  });

  return res.status(201).send({message: 'createUser', newUser});
}
async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query as DeleteUserQuery;
  if (!id) return res.status(400).send({message: 'error'});

  const deletedUser = await prisma.user.delete({
    where: {id},
  });
  return res.status(200).send({message: 'deleteUser', deletedUser});
}
async function readUser(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany();

  return res.status(200).send({message: 'readUser', users});
}