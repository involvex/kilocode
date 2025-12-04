/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
declare const viewsContainerSchema: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    icon: z.ZodString;
}, "strip", z.ZodTypeAny, {
    icon: string;
    id: string;
    title: string;
}, {
    icon: string;
    id: string;
    title: string;
}>, "many">>;
export type ViewsContainer = z.infer<typeof viewsContainerSchema>;
declare const viewsSchema: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
    type: z.ZodString;
    id: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    name: string;
}, {
    type: string;
    id: string;
    name: string;
}>, "many">>;
export type Views = z.infer<typeof viewsSchema>;
declare const commandsSchema: z.ZodArray<z.ZodObject<{
    command: z.ZodString;
    title: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    command: string;
    title: string;
    icon?: string | undefined;
    category?: string | undefined;
}, {
    command: string;
    title: string;
    icon?: string | undefined;
    category?: string | undefined;
}>, "many">;
export type Commands = z.infer<typeof commandsSchema>;
declare const menuItemSchema: z.ZodObject<{
    group: z.ZodString;
    command: z.ZodOptional<z.ZodString>;
    submenu: z.ZodOptional<z.ZodString>;
    when: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    group: string;
    command?: string | undefined;
    when?: string | undefined;
    submenu?: string | undefined;
}, {
    group: string;
    command?: string | undefined;
    when?: string | undefined;
    submenu?: string | undefined;
}>;
export type MenuItem = z.infer<typeof menuItemSchema>;
declare const menusSchema: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
    group: z.ZodString;
    command: z.ZodOptional<z.ZodString>;
    submenu: z.ZodOptional<z.ZodString>;
    when: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    group: string;
    command?: string | undefined;
    when?: string | undefined;
    submenu?: string | undefined;
}, {
    group: string;
    command?: string | undefined;
    when?: string | undefined;
    submenu?: string | undefined;
}>, "many">>;
export type Menus = z.infer<typeof menusSchema>;
declare const submenusSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    label: string;
}, {
    id: string;
    label: string;
}>, "many">;
export type Submenus = z.infer<typeof submenusSchema>;
declare const keybindingsSchema: z.ZodArray<z.ZodObject<{
    command: z.ZodString;
    key: z.ZodOptional<z.ZodString>;
    mac: z.ZodOptional<z.ZodString>;
    win: z.ZodOptional<z.ZodString>;
    linux: z.ZodOptional<z.ZodString>;
    when: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    command: string;
    key?: string | undefined;
    linux?: string | undefined;
    win?: string | undefined;
    mac?: string | undefined;
    when?: string | undefined;
}, {
    command: string;
    key?: string | undefined;
    linux?: string | undefined;
    win?: string | undefined;
    mac?: string | undefined;
    when?: string | undefined;
}>, "many">;
export type Keybindings = z.infer<typeof keybindingsSchema>;
declare const configurationPropertySchema: z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"array">, z.ZodLiteral<"object">, z.ZodLiteral<"boolean">, z.ZodLiteral<"number">]>;
    items: z.ZodOptional<z.ZodObject<{
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
    }, {
        type: string;
    }>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    enum: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    default: z.ZodOptional<z.ZodUnknown>;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "string" | "number" | "boolean" | "object" | "array";
    description: string;
    default?: any;
    properties?: Record<string, any> | undefined;
    items?: {
        type: string;
    } | undefined;
    enum?: any[] | undefined;
}, {
    type: "string" | "number" | "boolean" | "object" | "array";
    description: string;
    default?: any;
    properties?: Record<string, any> | undefined;
    items?: {
        type: string;
    } | undefined;
    enum?: any[] | undefined;
}>;
export type ConfigurationProperty = z.infer<typeof configurationPropertySchema>;
declare const configurationSchema: z.ZodObject<{
    title: z.ZodString;
    properties: z.ZodRecord<z.ZodString, z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"array">, z.ZodLiteral<"object">, z.ZodLiteral<"boolean">, z.ZodLiteral<"number">]>;
        items: z.ZodOptional<z.ZodObject<{
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
        }, {
            type: string;
        }>>;
        properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        enum: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
        default: z.ZodOptional<z.ZodUnknown>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "string" | "number" | "boolean" | "object" | "array";
        description: string;
        default?: any;
        properties?: Record<string, any> | undefined;
        items?: {
            type: string;
        } | undefined;
        enum?: any[] | undefined;
    }, {
        type: "string" | "number" | "boolean" | "object" | "array";
        description: string;
        default?: any;
        properties?: Record<string, any> | undefined;
        items?: {
            type: string;
        } | undefined;
        enum?: any[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    properties: Record<string, {
        type: "string" | "number" | "boolean" | "object" | "array";
        description: string;
        default?: any;
        properties?: Record<string, any> | undefined;
        items?: {
            type: string;
        } | undefined;
        enum?: any[] | undefined;
    }>;
    title: string;
}, {
    properties: Record<string, {
        type: "string" | "number" | "boolean" | "object" | "array";
        description: string;
        default?: any;
        properties?: Record<string, any> | undefined;
        items?: {
            type: string;
        } | undefined;
        enum?: any[] | undefined;
    }>;
    title: string;
}>;
export type Configuration = z.infer<typeof configurationSchema>;
export declare const contributesSchema: z.ZodObject<{
    viewsContainers: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        icon: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        icon: string;
        id: string;
        title: string;
    }, {
        icon: string;
        id: string;
        title: string;
    }>, "many">>;
    views: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        name: string;
    }, {
        type: string;
        id: string;
        name: string;
    }>, "many">>;
    commands: z.ZodArray<z.ZodObject<{
        command: z.ZodString;
        title: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        title: string;
        icon?: string | undefined;
        category?: string | undefined;
    }, {
        command: string;
        title: string;
        icon?: string | undefined;
        category?: string | undefined;
    }>, "many">;
    menus: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodObject<{
        group: z.ZodString;
        command: z.ZodOptional<z.ZodString>;
        submenu: z.ZodOptional<z.ZodString>;
        when: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        group: string;
        command?: string | undefined;
        when?: string | undefined;
        submenu?: string | undefined;
    }, {
        group: string;
        command?: string | undefined;
        when?: string | undefined;
        submenu?: string | undefined;
    }>, "many">>;
    submenus: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        label: string;
    }, {
        id: string;
        label: string;
    }>, "many">;
    keybindings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        command: z.ZodString;
        key: z.ZodOptional<z.ZodString>;
        mac: z.ZodOptional<z.ZodString>;
        win: z.ZodOptional<z.ZodString>;
        linux: z.ZodOptional<z.ZodString>;
        when: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        key?: string | undefined;
        linux?: string | undefined;
        win?: string | undefined;
        mac?: string | undefined;
        when?: string | undefined;
    }, {
        command: string;
        key?: string | undefined;
        linux?: string | undefined;
        win?: string | undefined;
        mac?: string | undefined;
        when?: string | undefined;
    }>, "many">>;
    configuration: z.ZodObject<{
        title: z.ZodString;
        properties: z.ZodRecord<z.ZodString, z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"string">, z.ZodLiteral<"array">, z.ZodLiteral<"object">, z.ZodLiteral<"boolean">, z.ZodLiteral<"number">]>;
            items: z.ZodOptional<z.ZodObject<{
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: string;
            }, {
                type: string;
            }>>;
            properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            enum: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
            default: z.ZodOptional<z.ZodUnknown>;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        properties: Record<string, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }>;
        title: string;
    }, {
        properties: Record<string, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }>;
        title: string;
    }>;
}, "strip", z.ZodTypeAny, {
    configuration: {
        properties: Record<string, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }>;
        title: string;
    };
    commands: {
        command: string;
        title: string;
        icon?: string | undefined;
        category?: string | undefined;
    }[];
    viewsContainers: Record<string, {
        icon: string;
        id: string;
        title: string;
    }[]>;
    views: Record<string, {
        type: string;
        id: string;
        name: string;
    }[]>;
    menus: Record<string, {
        group: string;
        command?: string | undefined;
        when?: string | undefined;
        submenu?: string | undefined;
    }[]>;
    submenus: {
        id: string;
        label: string;
    }[];
    keybindings?: {
        command: string;
        key?: string | undefined;
        linux?: string | undefined;
        win?: string | undefined;
        mac?: string | undefined;
        when?: string | undefined;
    }[] | undefined;
}, {
    configuration: {
        properties: Record<string, {
            type: "string" | "number" | "boolean" | "object" | "array";
            description: string;
            default?: any;
            properties?: Record<string, any> | undefined;
            items?: {
                type: string;
            } | undefined;
            enum?: any[] | undefined;
        }>;
        title: string;
    };
    commands: {
        command: string;
        title: string;
        icon?: string | undefined;
        category?: string | undefined;
    }[];
    viewsContainers: Record<string, {
        icon: string;
        id: string;
        title: string;
    }[]>;
    views: Record<string, {
        type: string;
        id: string;
        name: string;
    }[]>;
    menus: Record<string, {
        group: string;
        command?: string | undefined;
        when?: string | undefined;
        submenu?: string | undefined;
    }[]>;
    submenus: {
        id: string;
        label: string;
    }[];
    keybindings?: {
        command: string;
        key?: string | undefined;
        linux?: string | undefined;
        win?: string | undefined;
        mac?: string | undefined;
        when?: string | undefined;
    }[] | undefined;
}>;
export type Contributes = z.infer<typeof contributesSchema>;
export {};
//# sourceMappingURL=types.d.ts.map