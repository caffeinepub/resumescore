import Common "common";

module {
  public type Priority = { #high; #medium; #low };

  public type Tip = {
    category : Text;
    priority : Priority;
    text : Text;
  };

  public type CategoryScores = {
    keywords : Nat;
    skills : Nat;
    experience : Nat;
    education : Nat;
    formatting : Nat;
    clarity : Nat;
  };

  public type Analysis = {
    id : Common.AnalysisId;
    timestamp : Common.Timestamp;
    resumeText : Text;
    overallScore : Nat;
    categoryScores : CategoryScores;
    tips : [Tip];
  };

  public type AnalysisSummary = {
    id : Common.AnalysisId;
    timestamp : Common.Timestamp;
    snippet : Text;
    overallScore : Nat;
    categoryScores : CategoryScores;
  };

  public type AnalysisResult = { #ok : Analysis; #err : Text };
};
