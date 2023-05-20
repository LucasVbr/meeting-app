import {Button, Container, Flex, Input} from '@chakra-ui/react';
import Head from 'next/head';
import {websiteName} from '@/lib/constants';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import MessageList from '@/components/chat/MessageList';

import {io, Socket} from 'socket.io-client';
import {Message, User} from '@prisma/client';
import LoadingPage from '@/components/LoadingPage';

export default function ChatId() {
  const router = useRouter();
  const {data: session, status} = useSession({required: true});
  const {id: chatId} = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (status === 'authenticated') socketInitializer();
  }, [status]);

  const socketInitializer = () => {
    fetch(`/api/socket/chat/${chatId}`)
        .then(() => {
          const soc = io();

          soc.on('connect', () => console.log('connected'));
          soc.on('allOldMessages', (allOldMessages: Message[]) => setMessages(allOldMessages));
          soc.on('newIncomingMessage', (newIncomingMessage: Message) => setMessages(messages => [...messages, newIncomingMessage]));
          setSocket(soc);
        });
  };

  const handleSubmit = () => {
    if (text !== '' && socket && session?.user) {
      socket.emit('createdMessage', {text, sender: session.user.id});
      setText('');
    }
  };

  if (status === 'loading') return <LoadingPage/>;
  return (
      <>
        <Head><title>{websiteName}</title></Head>

        <Container>
          <MessageList user={session.user as User} messages={messages}/>

          <Flex gap={5} mt={5}>
            <Input type={'text'} colorScheme={'purple'}
                   onChange={evt => setText(evt.target.value)} value={text}/>
            <Button colorScheme={'purple'}
                    onClick={handleSubmit}>Envoyer</Button>
          </Flex>
        </Container>
      </>
  );
}