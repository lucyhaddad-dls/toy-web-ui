import type React from "react";
import { createContext } from "react";

export const SampleContext = createContext({});

export function DataProvider(props: { children: React.ReactNode }) {
    const { children } = props;


    return (<DataContext.Provider> 
    {children} 
    </DataContext.Provider>);

}
