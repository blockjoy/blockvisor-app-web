import {
  Command,
  CommandExitCode,
} from '@modules/grpc/library/blockjoy/v1/command';

export const DUMMY_COMMANDS: Command[] = [
  {
    id: 'cmd1',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_OK,
    exitMessage:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, a sit quo veritatis neque laborum explicabo tempora provident quae expedita voluptatibus unde?.',
    ackedAt: new Date(),
  },
  {
    id: 'cmd2',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_OK,
    exitMessage:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit dolore consectetur saepe nihil perspiciatis fuga!.',
    ackedAt: new Date(),
  },
  {
    id: 'cmd3',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_OK,
    exitMessage:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta assumenda obcaecati beatae adipisci ipsa, ad optio consequuntur ullam necessitatibus quo? Est eveniet doloremque similique veritatis asperiores earum voluptas nobis at!.',
    ackedAt: new Date(),
  },
  {
    id: 'cmd4',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_BLOCKING_JOB_RUNNING,
    exitMessage:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, esse molestias quidem ullam atque rerum dolores placeat sapiente, consequuntur aspernatur, accusamus quas?.',
    retryHintSeconds: 30,
    ackedAt: new Date(),
  },
  {
    id: 'cmd5',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_OK,
    exitMessage:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias debitis officia maiores quibusdam alias quos velit soluta consequatur voluptate!.',
    ackedAt: new Date(),
  },
  {
    id: 'cmd6',
    exitCode: CommandExitCode.COMMAND_EXIT_CODE_NOT_SUPPORTED,
    exitMessage:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, esse molestias quidem ullam atque rerum dolores placeat sapiente, consequuntur aspernatur, accusamus quas.',
    ackedAt: new Date(),
  },
];
