import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { colors } from 'styles/utils.colors.styles';

type Member = {
  username: string;
  role: string;
};

export const mapMembersToRows = (members: Member[]) => {
  return members.map((member, idx) => ({
    key: member.username ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{member.username}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <p>{member.role}</p>
          </>
        ),
      },
    ],
  }));
};

export const mapInvitesToRows = (invites: any[]) => {
  return invites.map((invite) => ({
    key: invite.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{invite.inviteeEmail}</p>
          </>
        ),
      },
      {
        key: '2',
        component: (
          <span css={[colors.text2]}>
            {formatDistanceToNow(new Date(invite.createdAtString), {
              addSuffix: true,
            })}
          </span>
        ),
      },
    ],
  }));
};
