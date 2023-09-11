export default interface UseCasesInterface {
    execute(input: any): Promise<any>;
}