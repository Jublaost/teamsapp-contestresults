import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/contestResultsTab/index.html")
@PreventIframe("/contestResultsTab/config.html")
@PreventIframe("/contestResultsTab/remove.html")
export class ContestResultsTab {
}
