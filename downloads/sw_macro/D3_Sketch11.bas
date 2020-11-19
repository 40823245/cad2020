Attribute VB_Name = "D3_Sketch11"
' ******************************************************************************
' C:\Users\user\AppData\Local\Temp\swx15112\Macro1.swb - macro recorded on 11/18/20 by user
' ******************************************************************************
Dim swApp As Object

Dim Part As Object
Dim boolstatus As Boolean
Dim longstatus As Long, longwarnings As Long

Sub main()

Set swApp = Application.SldWorks

Set Part = swApp.ActiveDoc
boolstatus = Part.Extension.SelectByID2("D3@Sketch1@Part1.SLDPRT", "DIMENSION", -1.07049555513913E-02, 0, -3.29650760581739E-02, False, 0, Nothing, 0)
boolstatus = Part.Extension.SelectByID2("D3@Sketch1@Part1.SLDPRT", "DIMENSION", -1.13652452348696E-02, 0, -2.75176861694783E-02, False, 0, Nothing, 0)
boolstatus = Part.Extension.SelectByID2("D3@Sketch1@Part1.SLDPRT", "DIMENSION", -1.10351003931304E-02, 0, -0.031809569112087, False, 0, Nothing, 0)
Dim myDimension As Object
Set myDimension = Part.Parameter("D3@Sketch1")
myDimension.SystemValue = 0.05
End Sub
