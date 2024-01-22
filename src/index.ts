import { CarbonAwareModel } from './lib/carbon-aware';

export * from './lib';
export * from './types';

// Test Model by running execute() on a single input
const model = new CarbonAwareModel();

const configParams = {
    'preferred-locations': ['Europe', 'Asia', 'North America'],
    'preferred-times': ["2023-07-06T00:00"],
};

const executeParams = [
    {
        duration: 3600,
        'cpu-util': 10,
        timestamp: '2021-01-01T00:00:00Z',
    },
    {
        duration: 3600,
        'cpu-util': 50,
        timestamp: '2021-01-01T00:00:00Z',
    }
];

const test = async () => {
    const configOutputs = await model.configure(configParams);
    console.log(configOutputs);

    const executeOutputs = await model.execute(executeParams);
    console.log(executeOutputs);
}
test();