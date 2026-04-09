import Types "../types/analysis";
import CommonTypes "../types/common";
import AnalysisLib "../lib/analysis";
import HistoryLib "../lib/history";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  analyses : Map.Map<CommonTypes.AnalysisId, Types.Analysis>,
  nextId : { var value : Nat },
) {
  public func analyzeResume(resumeText : Text) : async Types.AnalysisResult {
    if (resumeText.size() < 20) {
      return #err("Resume text is too short. Please provide a more complete resume.");
    };
    let id = nextId.value + 1;
    nextId.value += 1;
    let timestamp = Time.now();
    let analysis = AnalysisLib.scoreResume(id, timestamp, resumeText);
    HistoryLib.addAnalysis(analyses, analysis);
    #ok(analysis);
  };

  public query func getAnalysis(id : CommonTypes.AnalysisId) : async ?Types.Analysis {
    HistoryLib.getAnalysis(analyses, id);
  };

  public query func listAnalyses() : async [Types.AnalysisSummary] {
    HistoryLib.listSummaries(analyses);
  };

  public func deleteAnalysis(id : CommonTypes.AnalysisId) : async Bool {
    HistoryLib.deleteAnalysis(analyses, id);
  };
};
