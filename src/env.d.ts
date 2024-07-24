/// <reference path="../.astro/actions.d.ts" />
interface ImportMetaEnv {
	readonly TURSO_DATABASE_URL: string;
	readonly TURSO_AUTH_TOKEN: string;

}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}


