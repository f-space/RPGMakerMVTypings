//=============================================================================
// rpg_managers.js v1.3.4
//=============================================================================

declare var $dataActors: MV.Actor[];
declare var $dataClasses: MV.Class[];
declare var $dataSkills: MV.Skill[];
declare var $dataItems: MV.Item[];
declare var $dataWeapons: MV.Weapon[];
declare var $dataArmors: MV.Armor[];
declare var $dataEnemies: MV.Enemy[];
declare var $dataTroops: MV.Troop[];
declare var $dataStates: MV.State[];
declare var $dataAnimations: MV.Animation[];
declare var $dataTilesets: MV.Tileset[];
declare var $dataCommonEvents: MV.CommonEvent[];
declare var $dataSystem: MV.System;
declare var $dataMapInfos: MV.MapInfo[];
declare var $dataMap: MV.Map | null;
declare var $gameTemp: Game_Temp;
declare var $gameSystem: Game_System;
declare var $gameScreen: Game_Screen;
declare var $gameTimer: Game_Timer;
declare var $gameMessage: Game_Message;
declare var $gameSwitches: Game_Switches;
declare var $gameVariables: Game_Variables;
declare var $gameSelfSwitches: Game_SelfSwitches;
declare var $gameActors: Game_Actors;
declare var $gameParty: Game_Party;
declare var $gameTroop: Game_Troop;
declare var $gameMap: Game_Map;
declare var $gamePlayer: Game_Player;
declare var $testEvent: MV.EventCommand[] | null;

//-----------------------------------------------------------------------------
/**
 * The static class that manages the database and game objects.
 */
declare class DataManager {
	private constructor();

	public static _globalId: string;
	public static _lastAccessedId: number;
	public static _errorUrl: string | null;

	public static _databaseFiles: { name: string, src: string }[];

	public static loadDatabase(): void;
	public static loadDataFile(name: string, src: string): void;
	public static isDatabaseLoaded(): boolean;
	public static loadMapData(mapId: number): void;
	public static makeEmptyMap(): void;
	public static isMapLoaded(): boolean;
	public static onLoad(object: any): void;
	public static extractMetadata(data: DataManager.NoteHolder): void;
	public static checkError(): void;

	public static isBattleTest(): boolean;
	public static isEventTest(): boolean;
	public static isSkill(item: DataManager.Item): boolean;
	public static isItem(item: DataManager.Item): boolean;
	public static isWeapon(item: DataManager.Item): boolean;
	public static isArmor(item: DataManager.Item): boolean;

	public static createGameObjects(): void;
	public static setupNewGame(): void;
	public static setupBattleTest(): void;
	public static setupEventTest(): void;

	public static loadGlobalInfo(): DataManager.GlobalInfo;
	public static saveGlobalInfo(info: DataManager.GlobalInfo): void;
	public static isThisGameFile(savefileId: number): boolean;
	public static isAnySavefileExists(): boolean;
	public static latestSavefileId(): number;
	public static loadAllSavefileImages(): void;
	public static loadSavefileImages(info: DataManager.SaveFileInfo): void;
	public static maxSavefiles(): number;
	public static saveGame(savefileId: number): boolean;
	public static loadGame(savefileId: number): boolean;
	public static loadSavefileInfo(savefileId: number): DataManager.SaveFileInfo | null;
	public static lastAccessedSavefileId(): number;
	public static saveGameWithoutRescue(savefileId: number): boolean;
	public static loadGameWithoutRescue(savefileId: number): boolean;
	public static selectSavefileForNewGame(): void;
	public static makeSavefileInfo(): DataManager.SaveFileInfo;
	public static makeSaveContents(): DataManager.SaveContents;
	public static extractSaveContents(contents: DataManager.SaveContents): void;
}

declare namespace DataManager {
	type NoteHolder = { note: string; meta?: { [name: string]: string } };
	type Item = MV.Skill | MV.Item | MV.Weapon | MV.Armor;
	type GlobalInfo = SaveFileInfo[];

	interface SaveFileInfo {
		globalId: string;
		title: string;
		characters: [string, number][];
		faces: [string, number][];
		playtime: string;
		timestamp: number;
	}

	interface SaveContents {
		system: Game_System;
		screen: Game_Screen;
		timer: Game_Timer;
		switches: Game_Switches;
		variables: Game_Variables;
		selfSwitches: Game_SelfSwitches;
		actors: Game_Actors;
		party: Game_Party;
		map: Game_Map;
		player: Game_Player;
	}
}

//-----------------------------------------------------------------------------
/**
 * The static class that manages the configuration data.
 */
declare class ConfigManager {
	private constructor();

	public static alwaysDash: boolean;
	public static commandRemember: boolean;
	public static bgmVolume: number;
	public static bgsVolume: number;
	public static meVolume: number;
	public static seVolume: number;

	public static load(): void;
	public static save(): void;
	public static makeData(): ConfigManager.Config;
	public static applyData(config: ConfigManager.Config): void;
	public static readFlag(config: ConfigManager.Config, name: string): boolean;
	public static readVolume(config: ConfigManager.Config, name: string): number;
}

declare namespace ConfigManager {
	interface Config {
		alwaysDash: boolean;
		commandRemember: boolean;
		bgmVolume: number;
		bgsVolume: number;
		meVolume: number;
		seVolume: number;
	}
}

//-----------------------------------------------------------------------------
/**
 * The static class that manages storage for saving game data.
 */
declare class StorageManager {
	private constructor();

	public static save(savefileId: number, json: string): void;
	public static load(savefileId: number): string;
	public static exists(savefileId: number): boolean;
	public static remove(savefileId: number): void;

	public static backup(savefileId: number): void;
	public static backupExists(savefileId: number): boolean;
	public static cleanBackup(savefileId: number): void;
	public static restoreBackup(savefileId: number): void;

	public static isLocalMode(): boolean;
	public static saveToLocalFile(savefileId: number, json: string): void;
	public static loadFromLocalFile(savefileId: number): string;
	public static loadFromLocalBackupFile(savefileId: number): string;
	public static localFileBackupExists(savefileId: number): boolean;
	public static localFileExists(savefileId: number): boolean;
	public static removeLocalFile(savefileId: number): void;

	public static saveToWebStorage(savefileId: number, json: string): void;
	public static loadFromWebStorage(savefileId: number): string;
	public static loadFromWebStorageBackup(savefileId: number): string;
	public static webStorageBackupExists(savefileId: number): boolean;
	public static webStorageExists(savefileId: number): boolean;
	public static removeWebStorage(savefileId: number): void;

	public static localFileDirectoryPath(): string;
	public static localFilePath(savefileId: number): string;
	public static webStorageKey(savefileId: number): string;
}

//-----------------------------------------------------------------------------
/**
 * The static class that loads images, creates bitmap objects and retains them.
 */
declare class ImageManager {
	private constructor();

	public static cache: CacheMap;

	public static loadAnimation(filename: string, hue?: number): Bitmap;
	public static loadBattleback1(filename: string, hue?: number): Bitmap;
	public static loadBattleback2(filename: string, hue?: number): Bitmap;
	public static loadEnemy(filename: string, hue?: number): Bitmap;
	public static loadCharacter(filename: string, hue?: number): Bitmap;
	public static loadFace(filename: string, hue?: number): Bitmap;
	public static loadParallax(filename: string, hue?: number): Bitmap;
	public static loadPicture(filename: string, hue?: number): Bitmap;
	public static loadSvActor(filename: string, hue?: number): Bitmap;
	public static loadSvEnemy(filename: string, hue?: number): Bitmap;
	public static loadSystem(filename: string, hue?: number): Bitmap;
	public static loadTileset(filename: string, hue?: number): Bitmap;
	public static loadTitle1(filename: string, hue?: number): Bitmap;
	public static loadTitle2(filename: string, hue?: number): Bitmap;

	public static loadBitmap(folder: string, filename: string, hue: number, smooth: boolean): Bitmap;
	public static loadEmptyBitmap(): Bitmap;
	public static loadNormalBitmap(path: string, hue: number): Bitmap;
	public static clear(): void;

	public static isReady(): boolean;
	public static isObjectCharacter(filename: string): boolean;
	public static isBigCharacter(filename: string): boolean;
	public static isZeroParallax(filename: string): boolean;
}

//-----------------------------------------------------------------------------
/**
 * The static class that handles BGM, BGS, ME and SE.
 */
declare class AudioManager {
	private constructor();

	public static _bgmVolume: number;
	public static _bgsVolume: number;
	public static _meVolume: number;
	public static _seVolume: number;
	public static _currentBgm: AudioManager.AudioState | null;
	public static _currentBgs: AudioManager.AudioState | null;
	public static _bgmBuffer: AudioManager.AudioBuffer | null;
	public static _bgsBuffer: WebAudio | null;
	public static _meBuffer: WebAudio | null;
	public static _seBuffers: WebAudio[];
	public static _staticBuffers: WebAudio[];
	public static _replayFadeTime: number;
	public static _path: string;
	public static _blobUrl: string | null;

	public static bgmVolume: number;
	public static bgsVolume: number;
	public static meVolume: number;
	public static seVolume: number;

	public static playBgm(bgm: MV.AudioFile, pos?: number): void;
	public static playEncryptedBgm(bgm: MV.AudioFile, pos?: number): void;
	public static createDecryptBuffer(url: string, bgm: MV.AudioFile, pos?: number): void;
	public static replayBgm(bgm: AudioManager.AudioState): void;
	public static isCurrentBgm(bgm: MV.AudioFile): boolean;
	public static updateBgmParameters(bgm: MV.AudioFile): void;
	public static updateCurrentBgm(bgm: MV.AudioFile, pos?: number): void;
	public static stopBgm(): void;
	public static fadeOutBgm(duration: number): void;
	public static fadeInBgm(duration: number): void;

	public static playBgs(bgs: MV.AudioFile, pos?: number): void;
	public static replayBgs(bgs: AudioManager.AudioState): void;
	public static isCurrentBgs(bgs: MV.AudioFile): boolean;
	public static updateBgsParameters(bgs: MV.AudioFile): void;
	public static updateCurrentBgs(bgs: MV.AudioFile, pos?: number): void;
	public static stopBgs(): void;
	public static fadeOutBgs(duration: number): void;
	public static fadeInBgs(duration: number): void;

	public static playMe(me: MV.AudioFile): void;
	public static updateMeParameters(me: MV.AudioFile): void;
	public static fadeOutMe(duration: number): void;
	public static stopMe(): void;

	public static playSe(se: MV.AudioFile): void;
	public static updateSeParameters(buffer: WebAudio, se: MV.AudioFile): void;
	public static stopSe(): void;
	public static playStaticSe(se: MV.AudioFile): void;
	public static loadStaticSe(se: MV.AudioFile): void;
	public static isStaticSe(se: MV.AudioFile): boolean;

	public static stopAll(): void;
	public static saveBgm(): AudioManager.AudioState;
	public static saveBgs(): AudioManager.AudioState;
	public static makeEmptyAudioObject(): AudioManager.AudioState;
	public static createBuffer(folder: string, name: string): AudioManager.AudioBuffer;
	public static updateBufferParameters(buffer: AudioManager.AudioBuffer, configVolume: number, audio: MV.AudioFile): void;
	public static audioFileExt(): string;
	public static shouldUseHtml5Audio(): boolean;
	public static checkErrors(): void;
	public static checkWebAudioError(webAudio?: WebAudio): void;
}

declare namespace AudioManager {
	interface AudioState extends MV.AudioFile {
		pos?: number;
	}

	interface AudioBuffer {
		readonly url: string;
		volume: number;
		pitch?: number;
		pan?: number;
		isPlaying(): boolean;
		play(loop: boolean, offset: number): void;
		stop(): void;
		fadeIn(duration: number): void;
		fadeOut(duration: number): void;
		seek(): number;
	}
}

//-----------------------------------------------------------------------------
/**
 * The static class that plays sound effects defined in the database.
 */
declare class SoundManager {
	private constructor();

	public static preloadImportantSounds(): void;
	public static loadSystemSound(n: number): void;
	public static playSystemSound(n: number): void;

	public static playCursor(): void;
	public static playOk(): void;
	public static playCancel(): void;
	public static playBuzzer(): void;
	public static playEquip(): void;
	public static playSave(): void;
	public static playLoad(): void;
	public static playBattleStart(): void;
	public static playEscape(): void;
	public static playEnemyAttack(): void;
	public static playEnemyDamage(): void;
	public static playEnemyCollapse(): void;
	public static playBossCollapse1(): void;
	public static playBossCollapse2(): void;
	public static playActorDamage(): void;
	public static playActorCollapse(): void;
	public static playRecovery(): void;
	public static playMiss(): void;
	public static playEvasion(): void;
	public static playMagicEvasion(): void;
	public static playReflection(): void;
	public static playShop(): void;
	public static playUseItem(): void;
	public static playUseSkill(): void;
}

//-----------------------------------------------------------------------------
/**
 * The static class that handles terms and messages.
 */
declare class TextManager {
	private constructor();

	public static basic(basicId: number): string;
	public static param(paramId: number): string;
	public static command(commandId: number): string;
	public static message(messageId: string): string;

	public static getter(method: string, param: number | string): PropertyDescriptor;

	public static readonly currencyUnit: string;

	public static readonly level: string;
	public static readonly levelA: string;
	public static readonly hp: string;
	public static readonly hpA: string;
	public static readonly mp: string;
	public static readonly mpA: string;
	public static readonly tp: string;
	public static readonly tpA: string;
	public static readonly exp: string;
	public static readonly expA: string;
	public static readonly fight: string;
	public static readonly escape: string;
	public static readonly attack: string;
	public static readonly guard: string;
	public static readonly item: string;
	public static readonly skill: string;
	public static readonly equip: string;
	public static readonly status: string;
	public static readonly formation: string;
	public static readonly save: string;
	public static readonly gameEnd: string;
	public static readonly options: string;
	public static readonly weapon: string;
	public static readonly armor: string;
	public static readonly keyItem: string;
	public static readonly equip2: string;
	public static readonly optimize: string;
	public static readonly clear: string;
	public static readonly newGame: string;
	public static readonly continue_: string;
	public static readonly toTitle: string;
	public static readonly cancel: string;
	public static readonly buy: string;
	public static readonly sell: string;
	public static readonly alwaysDash: string;
	public static readonly commandRemember: string;
	public static readonly bgmVolume: string;
	public static readonly bgsVolume: string;
	public static readonly meVolume: string;
	public static readonly seVolume: string;
	public static readonly possession: string;
	public static readonly expTotal: string;
	public static readonly expNext: string;
	public static readonly saveMessage: string;
	public static readonly loadMessage: string;
	public static readonly file: string;
	public static readonly partyName: string;
	public static readonly emerge: string;
	public static readonly preemptive: string;
	public static readonly surprise: string;
	public static readonly escapeStart: string;
	public static readonly escapeFailure: string;
	public static readonly victory: string;
	public static readonly defeat: string;
	public static readonly obtainExp: string;
	public static readonly obtainGold: string;
	public static readonly obtainItem: string;
	public static readonly levelUp: string;
	public static readonly obtainSkill: string;
	public static readonly useItem: string;
	public static readonly criticalToEnemy: string;
	public static readonly criticalToActor: string;
	public static readonly actorDamage: string;
	public static readonly actorRecovery: string;
	public static readonly actorGain: string;
	public static readonly actorLoss: string;
	public static readonly actorDrain: string;
	public static readonly actorNoDamage: string;
	public static readonly actorNoHit: string;
	public static readonly enemyDamage: string;
	public static readonly enemyRecovery: string;
	public static readonly enemyGain: string;
	public static readonly enemyLoss: string;
	public static readonly enemyDrain: string;
	public static readonly enemyNoDamage: string;
	public static readonly enemyNoHit: string;
	public static readonly evasion: string;
	public static readonly magicEvasion: string;
	public static readonly magicReflection: string;
	public static readonly counterAttack: string;
	public static readonly substitute: string;
	public static readonly buffAdd: string;
	public static readonly debuffAdd: string;
	public static readonly buffRemove: string;
	public static readonly actionFailure: string;
}

//-----------------------------------------------------------------------------
/**
 * The static class that manages scene transitions.
 */
declare const SceneManager: SceneManager;
declare interface SceneManager extends GenericSceneManager<Scene_Base> { }

declare interface GenericSceneManager<T extends Stage> {
	/*
	 * Gets the current time in ms.
	 * @private
	 */
	_getTimeInMs(): number;

	_scene: T | null;
	_nextScene: T | null;
	_stack: SceneManager.SceneConstructor<T>[];
	_stopped: boolean;
	_sceneStarted: boolean;
	_exiting: boolean;
	_previousClass: SceneManager.SceneConstructor<T> | null;
	_backgroundBitmap: Bitmap | null;
	_screenWidth: number;
	_screenHeight: number;
	_boxWidth: number;
	_boxHeight: number;
	_deltaTime: number;
	_currentTime: number;
	_accumulator: number;

	run(sceneClass: SceneManager.SceneConstructor<T>): void;
	initialize(): void;
	initGraphics(): void;
	preferableRendererType(): string;
	shouldUseCanvasRenderer(): boolean;
	checkWebGL(): void;
	checkFileAccess(): void;
	initAudio(): void;
	initInput(): void;
	initNwjs(): void;
	checkPluginErrors(): void;
	setupErrorHandlers(): void;

	requestUpdate(): void;
	update(): void;
	terminate(): void;
	onError(e: Error): void;
	onKeyDown(event: KeyboardEvent): void;
	catchException(e: Error): void;
	tickStart(): void;
	tickEnd(): void;
	updateInputData(): void;

	updateMain(): void;
	updateManagers(ticks: number, delta: number): void;
	changeScene(): void;
	updateScene(): void;
	renderScene(): void;
	onSceneCreate(): void;
	onSceneStart(): void;
	onSceneLoading(): void;

	isSceneChanging(): boolean;
	isCurrentSceneBusy(): boolean;
	isCurrentSceneStarted(): boolean;
	isNextScene(sceneClass: SceneManager.SceneConstructor<T>): boolean;
	isPreviousScene(sceneClass: SceneManager.SceneConstructor<T>): boolean;

	goto(sceneClass: SceneManager.SceneConstructor<T>): void;
	push(sceneClass: SceneManager.SceneConstructor<T>): void;
	pop(): void;
	exit(): void;
	clearStack(): void;
	stop(): void;
	prepareNextScene(...args: any[]): void;
	snap(): Bitmap;
	snapForBackground(): void;
	backgroundBitmap(): Bitmap | null;
}

declare namespace SceneManager {
	interface SceneConstructor<T> {
		prototype: Stage;
		new (): T;
	}
}

//-----------------------------------------------------------------------------
/**
 * The static class that manages battle progress.
 */
declare const BattleManager: BattleManager;
declare interface BattleManager extends GenericBattleManager<Game_Battler, Game_Actor, Game_Action, Game_Item> { }

declare interface GenericBattleManager<Battler, Actor extends Battler, Action, Item> {
	_phase: number;
	_canEscape: boolean;
	_canLose: boolean;
	_battleTest: boolean;
	_eventCallback: BattleManager.Callback | null;
	_preemptive: boolean;
	_surprise: boolean;
	_actorIndex: number;
	_actionForcedBattler: Battler | null;
	_mapBgm: AudioManager.AudioState | null;
	_mapBgs: AudioManager.AudioState | null;
	_actionBattlers: Battler[];
	_subject: Battler | null;
	_action: Action | null;
	_targets: Battler[];
	_logWindow: BattleManager.LogWindow<Battler, Action> | null;
	_statusWindow: BattleManager.StatusWindow | null;
	_spriteset: BattleManager.Spriteset | null;
	_escapeRatio: number;
	_escaped: boolean;
	_rewards: BattleManager.Reward<Item>;

	setup(troopId: number, canEscape: boolean, canLose: boolean): void;
	initMembers(): void;
	isBattleTest(): boolean;
	setBattleTest(battleTest: boolean): void;
	setEventCallback(callback: BattleManager.Callback | null): void;
	setLogWindow(logWindow: BattleManager.LogWindow<Battler, Action> | null): void;
	setStatusWindow(statusWindow: BattleManager.StatusWindow | null): void;
	setSpriteset(spriteset: BattleManager.Spriteset | null): void;

	onEncounter(): void;
	ratePreemptive(): number;
	rateSurprise(): number;

	saveBgmAndBgs(): void;
	playBattleBgm(): void;
	playVictoryMe(): void;
	playDefeatMe(): void;
	replayBgmAndBgs(): void;

	makeEscapeRatio(): void;

	update(): void;
	updateEvent(): boolean;
	updateEventMain(): boolean;

	isBusy(): boolean;
	isInputting(): boolean;
	isInTurn(): boolean;
	isTurnEnd(): boolean;
	isAborting(): boolean;
	isBattleEnd(): boolean;
	canEscape(): boolean;
	canLose(): boolean;
	isEscaped(): boolean;

	actor(): Actor | null;
	clearActor(): void;
	changeActor(newActorIndex: number, lastActorActionState: string): void;

	startBattle(): void;
	displayStartMessages(): void;
	startInput(): void;
	inputtingAction(): Action | null;
	selectNextCommand(): void;
	selectPreviousCommand(): void;
	refreshStatus(): void;

	startTurn(): void;
	updateTurn(): void;
	processTurn(): void;
	endTurn(): void;
	updateTurnEnd(): void;

	getNextSubject(): Battler | null;
	allBattleMembers(): Battler[];
	makeActionOrders(): void;

	startAction(): void;
	updateAction(): void;
	endAction(): void;
	invokeAction(subject: Battler, target: Battler): void;
	invokeNormalAction(subject: Battler, target: Battler): void;
	invokeCounterAttack(subject: Battler, target: Battler): void;
	invokeMagicReflection(subject: Battler, target: Battler): void;
	applySubstitute(target: Battler): Battler;
	checkSubstitute(target: Battler): boolean;
	isActionForced(): boolean;
	forceAction(battler: Battler): void;
	processForcedAction(): void;

	abort(): void;
	checkBattleEnd(): boolean;
	checkAbort(): boolean;
	checkAbort2(): boolean;
	processVictory(): void;
	processEscape(): boolean;
	processAbort(): void;
	processDefeat(): void;
	endBattle(result: number): void;
	updateBattleEnd(): void;
	makeRewards(): void;

	displayVictoryMessage(): void;
	displayDefeatMessage(): void;
	displayEscapeSuccessMessage(): void;
	displayEscapeFailureMessage(): void;
	displayRewards(): void;
	displayExp(): void;
	displayGold(): void;
	displayDropItems(): void;

	gainRewards(): void;
	gainExp(): void;
	gainGold(): void;
	gainDropItems(): void;
}

declare namespace BattleManager {
	type Callback = (result: number) => void;

	interface LogWindow<Battler, Action> {
		isBusy(): boolean;
		push(methodName: string, ...args: any[]): void;
		startTurn(): void;
		startAction(subject: Battler, action: Action, targets: Battler[]): void;
		endAction(subject: Battler): void;
		displayAutoAffectedStatus(subject: Battler): void;
		displayCurrentState(subject: Battler): void;
		displayRegeneration(subject: Battler): void;
		displayCounter(target: Battler): void;
		displayReflection(target: Battler): void;
		displaySubstitute(substitute: Battler, target: Battler): void;
		displayActionResults(subject: Battler, target: Battler): void;
	}

	interface StatusWindow {
		refresh(): void;
	}

	interface Spriteset {
		isBusy(): boolean;
	}

	interface Reward<Item> {
		gold: number;
		exp: number;
		items: Item[];
	}
}

//-----------------------------------------------------------------------------
/**
 * The static class that manages the plugins.
 */
declare class PluginManager {
	private constructor();

	public static _path: string;
	public static _scripts: string[];
	public static _errorUrls: string[];
	public static _parameters: { [name: string]: string };

	public static setup(plugins: MV.Plugin[]): void;
	public static checkErrors(): void;
	public static parameters(name: string): { [name: string]: string };
	public static setParameters(name: string, parameters: { [name: string]: string }): void;
	public static loadScript(name: string): void;
	public static onError(e: Error): void;
}
