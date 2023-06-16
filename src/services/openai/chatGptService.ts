// https://platform.openai.com/docs/api-reference/images/create-edit
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

export const teste =  true;

interface NameResolverInput {
    name: string;
    format: boolean;
}

export const resolveName = ({ name, format } : NameResolverInput) => {
    if(!name) {
        return;
    }
    return name.toLowerCase(); 
}