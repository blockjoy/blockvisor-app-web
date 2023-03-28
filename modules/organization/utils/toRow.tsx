import { escapeHtml } from '@shared/utils/escapeHtml';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { colors } from 'styles/utils.colors.styles';

type Member = {
  username: string;
  role: string;
};

type Invitee = {
  id: string;
  inviteeEmail: string;
  createdAtString: string;
};

export const mapMembersToRows = (members: Member[]) => {
  return members.map((member, idx) => ({
    key: member.username ?? `${idx}`,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{escapeHtml(member.username)}</p>
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

export const mapInvitesToRows = (invites: Invitee[]) => {
  return invites.map((invite) => ({
    key: invite.id,
    cells: [
      {
        key: '1',
        component: (
          <>
            <p>{escapeHtml(invite.inviteeEmail)}</p>
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
