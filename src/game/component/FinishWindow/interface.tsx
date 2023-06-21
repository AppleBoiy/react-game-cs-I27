type FinishMessage = {
    head: string
    content: string
}

const default_finish_message: FinishMessage = {
    head: '',
    content: '',
}

export { default_finish_message }

export type { FinishMessage }
