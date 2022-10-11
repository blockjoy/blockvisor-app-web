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
