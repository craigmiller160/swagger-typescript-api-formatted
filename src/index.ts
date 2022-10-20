/* eslint-disable no-console */
import { generateApi, GenerateApiOutput, ModelType, SchemaTypePrimitiveContent } from 'swagger-typescript-api';
import path from 'path';

type PropertyDetails = {
    readonly name?: string;
    readonly type: string;
    readonly required: boolean;
    readonly enum?: ReadonlyArray<string>;
    readonly $parsed?: SchemaTypePrimitiveContent;
};

type Properties = Record<string, PropertyDetails>

type ExtendedModelType = ModelType & {
    readonly properties: Properties;
    readonly required: ReadonlyArray<string>;
}

const ARRAY_PATTERN = /^\((?<arrayType>.*)\)\[\]$/;

const formatDataType = (details: PropertyDetails): string => {
    if (details.enum) {
        return details.enum.map((value) => `'${value}'`).join(' | ');
    }

    const parsedType = details.$parsed?.content;
    if (!parsedType) {
        return '';
    }

    if (ARRAY_PATTERN.test(parsedType)) {
        const arrayType = ARRAY_PATTERN.exec(parsedType)?.groups?.arrayType;
        return `ReadonlyArray<${arrayType}>`;
    }

    return parsedType;
};

const formatProperties = (properties: Properties, required: ReadonlyArray<string>) => {
    if (!properties) {
        return '';
    }
    return Object.entries(properties)
        .map(([name, details]) => {
            const isRequired =
                required.find((requiredProp) => requiredProp === name) !==
                undefined;
            const q = isRequired ? '' : '?';
            return `readonly ${name}${q}: ${formatDataType(details)};`;
        })
        .join('\n\t');
};

const formatType = (type: ExtendedModelType) => {
    const properties = formatProperties(type.properties, type.required);
    return `export type ${type.name} = {
	${properties}
};`;
};

const formatOutput = (res: GenerateApiOutput) =>
    (res.configuration.modelTypes as ExtendedModelType[])
        .filter((type) => type.name !== 'Unit')
        .map(formatType)
        .join('\n\n');

const OUTPUT_PATH = path.join(process.cwd(), 'src', 'types', 'generated');

const doGenerateApi = (name: string, url: string): Promise<unknown> => generateApi({
    name,
    url,
    generateClient: false
})
    .then((res) => {
        const newOutput = formatOutput(res);
        res.createFile({
            path: OUTPUT_PATH,
            fileName: 'expense-tracker.ts',
            content: newOutput
        });
        console.log('API types successfully generated');
    })
    .catch((ex) => console.error('Error generating API types', ex));
