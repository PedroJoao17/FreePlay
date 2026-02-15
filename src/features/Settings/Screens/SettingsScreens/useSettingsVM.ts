export function useSettingsVM() {
    // KISS: ainda sem permissões/preferências persistidas
    const items = [
        {
            title: "Tema",
            description: "Automático (usa o tema do sistema).",
        },
        {
            title: "Sobre",
            description: "FreePlay — player offline open source.",
        },
        {
            title: "Licenças",
            description: "Dependências e licenças de terceiros (futuro).",
        },
    ];

    return { items };
}
