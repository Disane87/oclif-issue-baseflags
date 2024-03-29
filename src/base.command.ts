/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
import { Command, Flags, Interfaces } from '@oclif/core'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export enum LogLevel {
    trace = 'trace',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error'
}

export abstract class BaseCommand<T extends typeof Command> extends Command {
    // add the --json flag
    static enableJsonFlag = true

    // define flags that can be inherited by any command that extends BaseCommand
    static baseFlags = {
        logLevel: Flags.custom<LogLevel>({
            summary: 'Specify level for logging.',
            options: Object.values(LogLevel),
            default: LogLevel.info,
        })(),

        debug: Flags.boolean({ char: 'd', default: true }),
        logPath: Flags.string({ char: 'l', description: 'Log path', default: './logs/' }),
    }

    protected flags!: Flags<T>;

    public async init(): Promise<void> {
        await super.init()
        const { flags } = await this.parse({
            flags: this.ctor.flags,
            baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
            args: this.ctor.args,
            strict: this.ctor.strict,
        })
        this.flags = flags as Flags<T>

        console.log('Flags', this.flags)
    }

    protected async catch(err: Error & { exitCode?: number }): Promise<any> {
        // add any custom logic to handle errors from the command
        // or simply return the parent class error handling
        return super.catch(err)
    }

    protected async finally(_: Error | undefined): Promise<any> {
        // called after run and catch regardless of whether or not the command errored
        return super.finally(_)
    }
}
