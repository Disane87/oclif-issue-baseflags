/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { Args, Command, Flags } from '@oclif/core'

export default class World extends Command {
  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({ char: 'f', description: 'Who is saying hello', required: false }),
  }

  static args = {
    person: Args.string({ description: 'Person to say hello to', required: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(World)

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }
}
