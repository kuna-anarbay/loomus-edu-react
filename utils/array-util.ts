export default class ArrayUtil {

    static addOrEdit(array: any[], item: any, param: string = "id"): any[] {
        const temp = [...array];
        const index = temp.findIndex(i => i[param] === item[param]);
        if (index === -1) {
            temp.push(item);
        } else {
            temp[index] = item;
        }

        return temp;
    }


    static addOrDelete(array: any[], item: any): any[] {
        const temp = [...array];
        const index = temp.findIndex(i => i.id === item.id);
        if (index === -1) {
            temp.push(item);
        } else {
            temp.splice(index, 1);
        }

        return temp;
    }


    static reorder(array: any[], source: number, destination: number): any[] {
        const items = Array.from(array);
        if (source > destination) {
            items[source].index = destination + 1;
            for (let i = destination; i < source; i++) {
                items[i].index += 1;
            }
        } else {
            items[source].index = destination + 1;
            for (let i = destination; i > source; i--) {
                items[i].index -= 1;
            }
        }

        return items;
    }
    

    static merge(array1: any[], array2: any[]): any[] {
        const temp = [...array1];
        array2.forEach(item => {
            const index = temp.findIndex(i => i.id === item.id);
            if (index === -1) {
                temp.push(item);
            } else {
                temp[index] = item;
            }
        });

        return temp;
    }

}