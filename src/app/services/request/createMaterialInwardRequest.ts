export interface MaterialInwardsStructure {
    id?: string,
    inward_date: string;
    materials: Materials[];
}

export interface Materials {
    id?: string,
    name: string,
    quantity: string
}