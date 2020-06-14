import { SortDataPipe } from "./sort-pipe";

describe('SortPipe', () => {
    let pipe: SortDataPipe;
    let data: Array<{ name: string, contents: number, location: string, date: Date }> = [];

    beforeEach(async() => {
        pipe = new SortDataPipe();
        data = [
            { name: 'MNB', contents: 14, location: 'drain', date: new Date('2017-8-23') },
            { name: 'MNB 2', contents: 15, location: 'drain', date: new Date('2017-9-23') },
            { name: 'MNB 3', contents: 16, location: 'drain', date: new Date('2017-1-23') },
            { name: 'MJB 2', contents: 13, location: 'bridge', date: new Date('2018-3-15') },
            { name: 'MJB 3', contents: 10, location: 'bridge', date: new Date('2019-7-12') },
            { name: 'Carriageway', contents: 5, location: 'carriageway', date: new Date('2028-8-23') },
            { name: 'random', contents: 6, location: 'carriageway', date: new Date('2020-8-23') },
        ];
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should sort string data in ascending order', () => {
        let result = '';
        const initialIndex = data.map((value) => value.name).indexOf('MNB 3');

        result = pipe.transform(data, 'asc', 'location', 'plan');
        const finalIndex = data.map((value) => value.name).indexOf('MNB 3');
        
        expect(initialIndex).toBeLessThan(finalIndex);
    });

    it('should sort date data in descending order', () => {
        let result = '';
        const initialIndex = data.map((value) => value.name).indexOf('Carriageway');

        result = pipe.transform(data, 'desc', 'date', 'plan');
        const finalIndex = data.map((value) => value.name).indexOf('Carriageway');

        expect(initialIndex).toBeGreaterThan(finalIndex);
    });

    afterEach(async() => {
        pipe = null;
        data = [];
    });
});
