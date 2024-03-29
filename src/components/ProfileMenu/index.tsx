import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

import {
  AccountCircle,
  ExitToApp,
  FormatListBulleted,
} from 'styled-icons/material-outlined';

import * as S from './styles';

export type ProfileMenuProps = {
  activeLink?: '/profile/me' | '/profile/cards' | '/profile/orders' | string;
};

const ProfileMenu = ({ activeLink }: ProfileMenuProps) => {
  const { push } = useRouter();

  return (
    <S.Nav>
      <Link href="/profile/me" passHref>
        <S.Link isActive={activeLink === '/profile/me'} title="My Profile">
          <AccountCircle size={24} />
          <span>My Profile</span>
        </S.Link>
      </Link>

      <Link href="/profile/orders" passHref>
        <S.Link isActive={activeLink === '/profile/orders'} title="My Orders">
          <FormatListBulleted size={24} />
          <span>My Orders</span>
        </S.Link>
      </Link>

      <S.Link
        role="button"
        onClick={async () => {
          const { url } = await signOut({ redirect: false, callbackUrl: '/' });
          push(url);
        }}
      >
        <ExitToApp size={24} />
        <span>Sign out</span>
      </S.Link>
    </S.Nav>
  );
};

export default ProfileMenu;
