import { FilterDataPipe } from './filter-data.pipe';

describe('SortPipe', () => {
    let pipe: FilterDataPipe;
    let data: Array<{ name: string, contents: number, location: string, date: Date }> = [];

    beforeEach(async() => {
        pipe = new FilterDataPipe();
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

    it('should filter string data', () => {
        let result = '';
        const initialIndex = data.length;

        result = pipe.transform(data, 'drain', 'location', 'plan');
        const finalIndex = data.length;

        expect(data.length).toBeGreaterThan(result.length);
    });

    afterEach(async() => {
        pipe = null;
        data = [];
    });
});

