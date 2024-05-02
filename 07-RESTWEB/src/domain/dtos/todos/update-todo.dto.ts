export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly content?: string,
        public readonly completedAt?: string,
    ) { }


    get values(){
        const returnObj: {[key: string]: any} = {};
        
        if(this.content) returnObj.content = this.content;
        if(this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, content, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(Number(id))) return ['Id property should be a number', undefined];

        if (completedAt) {
            newCompletedAt = new Date(completedAt)
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['Invalid date format']
            }
        }




        return [undefined, new UpdateTodoDto(id, content, newCompletedAt)];
    }


}