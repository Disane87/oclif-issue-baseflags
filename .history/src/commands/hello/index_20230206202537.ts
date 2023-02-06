/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { Flags } from "@oclif/core"
import { BaseCommand } from "../../base.command"

export default class MyCommand extends BaseCommand<typeof MyCommand> {
  static summary = 'child class that extends BaseCommand'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --json',
    '<%= config.bin %> <%= command.id %> --log-level debug',
  ]

  static flags = {
    name: Flags.string({
      char: 'n',
      summary: 'Name to print.',
      required: true,
    }),
  }

  public async run(): Promise<void> {
    for (const [flag, value] of Object.entries(this.flags)) {
      this.log(`${flag}: ${value}`)
    }
  }
}
