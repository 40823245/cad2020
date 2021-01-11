var tipuesearch = {"pages": [{'title': 'About', 'text': '倉儲: https://github.com/40823245/cad2020 \n \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'Work', 'text': '放上每周作業並更新、自評互評、小組作業', 'tags': '', 'url': 'Work.html'}, {'title': 'w1', 'text': '零件繪圖、建立網站、使用ssh \n', 'tags': '', 'url': 'w1.html'}, {'title': 'HW1', 'text': 'pdf1:Solidworks2017使用1mm繪製 \n pdf2: Solidworks2017繪製(mm) \n \n pdf1 \n 1-10 \n \n 11-20 \n \n 21-30 \n \n 31-40 \n \n 41-50 \n \n pdf2 \n 件1 \n \n 件2 \n \n 件3-1 \n \n 件3-2 \n \n 件3-3 \n \n 件3-4 \n \n 件3-5 \n \n 3-22 \n \n 4-7 \n \n 5-5 \n \n 5-7 \n \n 5-10 \n \n 5-15 \n \n', 'tags': '', 'url': 'HW1.html'}, {'title': 'w2-w3', 'text': '零件繪製、表格製作、下載nx可攜版 \n nxopen_getting_started_v12.pdf \n', 'tags': '', 'url': 'w2-w3.html'}, {'title': 'w4-w6', 'text': '零件繪製(小組、個人)、下載課程使用程式、使用Zoomit、soildworks API \n', 'tags': '', 'url': 'w4-w6.html'}, {'title': 'HW2', 'text': '零件45 \n Solidworks2017使用10mm繪製 \n 製圖影片: \n \n \n 程式碼: \n import pythoncom\nimport win32com.client\nimport win32api\nimport os\n \nos.system("taskkill /IM sldworks.exe /F")\nos.system("taskkill /IM sldworks_fs.exe /F")\n \n\'\'\'\nAbout DispatchEx and Dispatch Methods:\nhttps://stackoverflow.com/questions/18648933/using-pywin32-what-is-the-difference-between-dispatch-and-dispatchex\nSource code:\nhttp://pywin32.hg.sourceforge.net/hgweb/pywin32/pywin32/file/0db1b26904d5/com/win32com/src/PyIDispatch.cpp\nDoc:\nhttps://docs.microsoft.com/en-us/dotnet/standard/native-interop/com-callable-wrapper\n \nIDispatch: Provides a mechanism for late binding to type.\nIDispatchEx:\n    Interface supplied by the runtime if the class implements IExpando. The IDispatchEx interface is an extension of the IDispatch interface that, unlike IDispatch, enables enumeration, addition, deletion, and case-sensitive calling of members.\n\'\'\'\napp = win32com.client.DispatchEx("SldWorks.Application")\n#app=win32com.client.Dispatch("SldWorks.Application")\n \n# define var to convert variables\ndef var(type, value):\n    # type needs to be string\n    # use builtin getattr() to return pythoncom.type\n    pytype = getattr(pythoncom, type)\n    return win32com.client.VARIANT(pytype, value)\n \n# for two-type variable convert\n# is there any three-type variant?\ndef var2(type1, type2, value):\n    pytype1 = getattr(pythoncom, type1)\n    pytype2 = getattr(pythoncom, type2)\n    return win32com.client.VARIANT(pytype1|pytype2, value)\n     \ndef part(app, fileName, sketchName, dimName, newDim, newFileName):\n    arg1 = var("VT_I4", 1)\n    # GetMassProperties( ((3, 1), (16387, 3)))\n    #arg1 = win32com.client.VARIANT(pythoncom.VT_I4, 1)\n    arg2 = var("VT_I4", -1)\n \n    # 0. need the most important obj app\n    #app=win32com.client.Dispatch("SldWorks.Application")\n    # use relative directory to open part\n    # 1. open part file, need the path of the part file (need the file name)\n    #doc=app.OpenDoc(".\\\\block2.SLDPRT", 1)\n    doc=app.OpenDoc(os.path.join(os.getcwd(), fileName), 1)\n    # save part as binary stl\n    # can we save part as ASCII stl as well?\n    #doc.SaveAs2(".\\\\block2.stl", 0, True, False)\n    # the parameter VARIANT list for SelectByID2\n    # can we automate the VARIANT conversion?\n    # 2. use the sketch to select the SKETCH (need the sketch name)\n    #SelectByID2((8, 1), (8, 1), (5, 1), (5, 1), (5, 1), (11, 1), (3, 1), (9, 1), (3, 1))\n    #arg3 = var("VT_BSTR", "Sketch1")\n    arg3 = var("VT_BSTR", sketchName)\n    arg4 = var("VT_BSTR", "SKETCH")\n    arg5 = var("VT_R8", 0)\n    arg6 = var("VT_R8", 0)\n    arg7 = var("VT_R8", 0)\n    arg8 = var("VT_BOOL", False)\n    arg9 = var("VT_I4", 0)\n    arg10 = var("VT_DISPATCH", None)\n    arg11 = var("VT_I4", 0)\n    # select Sketch1 first\n    status = doc.Extension.SelectByID2(arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11)\n    # select DIMENSION to to modify\n    # 3. use the dimension name @ sketch name @ part file name\n    # to select the DIMENSION to modify\n    #arg12 = var("VT_BSTR", "Width@Sketch1@block2.SLDPRT")\n    arg12 = var("VT_BSTR", dimName+"@"+sketchName+"@"+fileName)\n    arg13 = var("VT_BSTR", "DIMENSION")\n    status = doc.Extension.SelectByID2(arg12, arg13, arg5, arg6, arg7, arg8, arg9, arg10, arg11)\n    #Dim swDimension As SldWorks.Dimension\n    # 4. to bring out the parameter to modify, need the dimension name and \n    # sketch name\n    #swDimension = doc.Parameter("Width@Sketch1")\n    swDimension = doc.Parameter(dimName+"@"+sketchName)\n    # the dimension unit is in meter\n    # 5. need the new value of the parameter\n    #swDimension.SystemValue = 0.50\n    swDimension.SystemValue = newDim\n    # 6. do the final house keeping process, clear selection and rebuild the part\n    sel = doc.ClearSelection2 \n    sel = True\n    status = doc.EditRebuild()\n    arg31 = var("VT_I4", 1)\n    arg32 = var2("VT_I4", "VT_BYREF", 3)\n    # 7. get the volume of the new part\n    volumn = doc.Extension.GetMassProperties(arg31, arg32)\n    #print(volumn[3]*1E9, "mm*3")\n    # 8. save the new part (need the new part file name)\n    #doc.SaveAs2(".\\\\block3.SLDPRT", 0, True, False)\n    doc.SaveAs2(os.path.join(os.getcwd(), "html/" + newFileName + ".SLDPRT"), 0, True, False)\n    # save jpg of part\n    doc.EditRebuild()\n    arg33 = var("VT_BSTR", "Isometric")\n    doc.ShowNamedView(arg33)\n    doc.ViewZoomtofit2()\n    doc.SaveAs3(os.path.join(os.getcwd(), "html/" + newFileName + ".jpg"), 0, 0)\n    # mm*3\n    return str(round(volumn[3]*1E9, 3)) + " mm*3"\nhtml = "以下零件採SolidWorks 2017繪製:<br /><br /><table border=\'1\' cellpadding=\'5\'><tr><th>Number</th><th>Part</th><th>Jpg</th><th>Width</th><th>Volume</th></tr>"\nindex = 0\nfor i in range(1, 11):\n    dim = i*0.002\n    blockVolume = part(app, "45_step.SLDPRT", "Sketch1", "Width", dim, "45_" + str(i))\n    print("45_" + str(i) + ".SLDPRT, dim= " + str(round(dim, 3)) +", volume= " + blockVolume)\n    index += 1\n    newFileName = "45_" + str(i)\n    html += \'\'\'<tr>\n    <td>\'\'\' + str(index) +\'\'\'</td>\n    <td><a href="./../downloads/sw_macro/html/\'\'\' + newFileName + \'\'\'.SLDPRT">\'\'\' + newFileName + \'\'\'.SLDPRT</a></td>\n    <td><img width="300" src="./../downloads/sw_macro/html/\'\'\' + newFileName + \'\'\'.jpg"></img></td>\n    <td>\'\'\' + str(round(dim*1000, 2)) + \'\'\' mm </td>\n    <td>\'\'\' + blockVolume + \'\'\'</td>\n    </tr>\n    \'\'\'\nhtml += "</table>"\n# save part.html\nwith open("./html/part.html", "w", encoding="utf-8") as f:\n     f.write(html)\n      \n\'\'\'\nfor assembly\n        swModelDocExt.SelectByID2("", "EDGE", -0.439825991092107, 7.07350481263802E-02, 0.40982045578545, true, 2, null, 0);\n        swModelDocExt.SelectByID2("", "EDGE", -0.219003008311574, 0.073085842475507, 0.549481823985616, true, 4, null, 0);\n        swModelDocExt.SelectByID2("Part-3@AssemModel", "COMPONENT", 0, 0, 0, true, 1, null, 0);\n        swFeature = (Feature)swFeatureManager.FeatureLinearPattern2(3, 40 / 1000, 0, 0, false, true, "NULL", "NULL", false);\n        assemblyModel.ClearSelection2(true);\n\'\'\'\nos.system("taskkill /IM sldworks.exe /F")\nos.system("taskkill /IM sldworks_fs.exe /F")\n# now the SolidWorks is embedding \n \n SWAPI(-10%) \n 以下零件採 SolidWorks 2017繪製:  \n \n \n \n Number \n Part \n Jpg \n Width \n Volume \n \n \n 1 \n 45_1.SLDPRT \n \n 2.0 mm \n 33123.501 mm*3 \n \n \n 2 \n 45_2.SLDPRT \n \n 4.0 mm \n 34207.295 mm*3 \n \n \n 3 \n 45_3.SLDPRT \n \n 6.0 mm \n 35292.855 mm*3 \n \n \n 4 \n 45_4.SLDPRT \n \n 8.0 mm \n 36405.806 mm*3 \n \n \n 5 \n 45_5.SLDPRT \n \n 10.0 mm \n 37570.796 mm*3 \n \n \n 6 \n 45_6.SLDPRT \n \n 12.0 mm \n 38770.796 mm*3 \n \n \n 7 \n 45_7.SLDPRT \n \n 14.0 mm \n 39970.796 mm*3 \n \n \n 8 \n 45_8.SLDPRT \n \n 16.0 mm \n 41170.796 mm*3 \n \n \n 9 \n 45_9.SLDPRT \n \n 18.0 mm \n 42370.796 mm*3 \n \n \n 10 \n 45_10.SLDPRT \n \n 20.0 mm \n 43570.796 mm*3 \n \n \n \n SWAPI(-5%) \n 以下零件採SolidWorks 2017繪製: \n \n \n \n Number \n Part \n Jpg \n Width \n Volume \n \n \n 1 \n 45_1.SLDPRT \n \n 2.5 mm \n 33395.937 mm*3 \n \n \n 2 \n 45_2.SLDPRT \n \n 5.0 mm \n 34748.159 mm*3 \n \n \n 3 \n 45_3.SLDPRT \n \n 7.5 mm \n 36123.686 mm*3 \n \n \n 4 \n 45_4.SLDPRT \n \n 10.0 mm \n 37570.796 mm*3 \n \n \n 5 \n 45_5.SLDPRT \n \n 12.5 mm \n 39070.796 mm*3 \n \n \n 6 \n 45_6.SLDPRT \n \n 15.0 mm \n 40570.796 mm*3 \n \n \n 7 \n 45_7.SLDPRT \n \n 17.5 mm \n 42070.796 mm*3 \n \n \n 8 \n 45_8.SLDPRT \n \n 20.0 mm \n 43570.796 mm*3 \n \n \n 9 \n 45_9.SLDPRT \n \n 22.5 mm \n 45070.796 mm*3 \n \n \n 10 \n 45_10.SLDPRT \n \n 25.0 mm \n 46570.796 mm*3 \n \n \n \n SWAPI(+10%) \n 以下零件採SolidWorks 2017繪製:  \n \n \n \n Number \n Part \n Jpg \n Width \n Volume \n \n \n 1 \n 45_1.SLDPRT \n \n 20.0 mm \n 43570.796 mm*3 \n \n \n 2 \n 45_2.SLDPRT \n \n 40.0 mm \n 54808.246 mm*3 \n \n \n 3 \n 45_3.SLDPRT \n \n 60.0 mm \n 67141.593 mm*3 \n \n \n 4 \n 45_4.SLDPRT \n \n 80.0 mm \n 79141.593 mm*3 \n \n \n 5 \n 45_5.SLDPRT \n \n 100.0 mm \n 91141.593 mm*3 \n \n \n 6 \n 45_6.SLDPRT \n \n 120.0 mm \n 103141.593 mm*3 \n \n \n 7 \n 45_7.SLDPRT \n \n 140.0 mm \n 115141.593 mm*3 \n \n \n 8 \n 45_8.SLDPRT \n \n 160.0 mm \n 127141.593 mm*3 \n \n \n 9 \n 45_9.SLDPRT \n \n 180.0 mm \n 139141.593 mm*3 \n \n \n 10 \n 45_10.SLDPRT \n \n 200.0 mm \n 151141.593 mm*3 \n \n \n \n SWAPI(+5%) \n 以下零件採SolidWorks 2017繪製:  \n \n \n \n Number \n Part \n Jpg \n Width \n Volume \n \n \n 1 \n 45_1.SLDPRT \n \n 15.0 mm \n 40570.796 mm*3 \n \n \n 2 \n 45_2.SLDPRT \n \n 30.0 mm \n 49570.796 mm*3 \n \n \n 3 \n 45_3.SLDPRT \n \n 45.0 mm \n 58141.593 mm*3 \n \n \n 4 \n 45_4.SLDPRT \n \n 60.0 mm \n 67141.593 mm*3 \n \n \n 5 \n 45_5.SLDPRT \n \n 75.0 mm \n 76141.593 mm*3 \n \n \n 6 \n 45_6.SLDPRT \n \n 90.0 mm \n 85141.593 mm*3 \n \n \n 7 \n 45_7.SLDPRT \n \n 105.0 mm \n 94141.593 mm*3 \n \n \n 8 \n 45_8.SLDPRT \n \n 120.0 mm \n 103141.593 mm*3 \n \n \n 9 \n 45_9.SLDPRT \n \n 135.0 mm \n 112141.593 mm*3 \n \n \n 10 \n 45_10.SLDPRT \n \n 150.0 mm \n 121141.593 mm*3 \n \n \n', 'tags': '', 'url': 'HW2.html'}, {'title': 'w7', 'text': '下載並使用tcc、零件繪圖(小組、個人)、使用RoKiSim \n', 'tags': '', 'url': 'w7.html'}, {'title': 'tcc', 'text': '下載並修改路徑，所使用.c程式在白窗進行 \n 測試1: \n \n 測試2: \n', 'tags': '', 'url': 'tcc.html'}, {'title': 'HW3', 'text': '試用RoKiSim \n \n', 'tags': '', 'url': 'HW3.html'}, {'title': 'w8~w9', 'text': '零件繪圖(小組、個人)、tcc轉換(.c→.py)、使用Pyslvs_UI、期中成績 \n', 'tags': '', 'url': 'w8~w9.html'}, {'title': 'tcc轉換', 'text': '將.c檔轉換成.py檔，並執行py檔 \n tcc -w -shared -DLIBTCC_AS_DLL -DONE_SOURCE multiply.c -o multiply.dll \n tcc -w -shared -DLIBTCC_AS_DLL -DONE_SOURCE multiply_float.c -o multiply_float.dll \n \n', 'tags': '', 'url': 'tcc轉換.html'}, {'title': 'Pyslvs_UI', 'text': '下載Pyslvs_UI並使用Pyslvs_UI畫連桿使其運作 \n \n \n', 'tags': '', 'url': 'Pyslvs_UI.html'}, {'title': 'w10~w18', 'text': '小組任務開始 \n 小組倉儲: https://github.com/40823245/cad2020bg2 \n 小組gitter: https://gitter.im/cad2020bg2/community \n 進度: \n 12/04 \n 使用gitter進行討論，並錄製過程和截圖 \n 12/11 \n 討論並投票圖檔的版本 \n 12/25 \n 修改圖檔和模擬 \n 01/07 \n 程式模擬和做動模擬', 'tags': '', 'url': 'w10~w18.html'}, {'title': '12-04', 'text': '\n 討論結果為要做彈珠台，並小組分工 \n 因為錄製影片出問題，所以後續內容用截圖 \n \n \n \n \n \n', 'tags': '', 'url': '12-04.html'}, {'title': '12-11', 'text': '  \n 討論結果 \n 圖檔 \n', 'tags': '', 'url': '12-11.html'}, {'title': '12-24', 'text': '測試影片: \n \n pinblall-3.ttt \n 圖檔 \n 提出問題並修改 \n', 'tags': '', 'url': '12-24.html'}, {'title': '01-07', 'text': '程式模擬和做動模擬: \n \n pinblall-9.ttt \n 圖檔 \n 第1次測試因為stick為可穿透的，所以ball沒辦法被stick擋住，還有程式控制鍵盤上下鍵所位移的位置和設定需再調整，第2次測試stick為不可穿透，但程式控制鍵盤上下有問題，所以還須修正 \n', 'tags': '', 'url': '01-07.html'}, {'title': '筆記', 'text': '一、開啟9443 \n \n 先打指令到cmsimde資料夾 \n 在執行python wsgi.py指令 \n 網址搜尋https://localhost:9443/ \n 或複製黑窗最後一行的網址 \n \n 案login登入→密碼admin \n 二、開啟8444 \n 先到scad2資料夾找到http-server.py檔案 \n \n 使用白窗開啟http-server.py \n 點選Tools→go \n \n 三、製作金鑰 \n 點選資料夾的Portablegit →bin→sh.exe \n \n 輸入ssh-keygen -t rsa -b 4096 -C "40823245" \n 請自行改成自己的學號 \n 案enter →輸入/y/tmp/id_rsa→案2次enter \n \n 下載 putty 、 putty_home 、 GitExtensions (請自行更改路徑) \n 將start移到白窗\xa0 並新增\xa0 \n set GIT_HOME=%Disk%:\\Portablegit\\bin\\\nset GIT_SSH=%Disk%:\\putty\\plink.exe \n \n \n 打開.git資料夾，把config移到白窗 \n 如沒有.git資料夾 打開隱藏的項目 \n \n 新增 [remote "origin"]裡的 url = git@github.com:40823245/cad2020.git \n \n file→save \n 打開putty資料夾的puttygen.exe \n 點load，找到id_rsa \n \n 案是→Save private key→案是→輸入學號(存.ppk檔) \n 打開putty.exe \n \n 若沒有github.com，在Host Name和Save Sessions打 github.com案Save \n \n 設定proxy(使用自家網路、手機網路請選None) \n 看你的網路連到哪一台 就打一樣的proxy \n \n 打開SSH裡面的Auth \n 選擇你所生產的金鑰檔案(.ppk) \n 回到session點選save再open \n \n 在home新增.ssh資料夾 \n ProxyCommand y:/putty/plink.exe github.com %h %p\n \nHost github.com\n    User git\n    Port 22\n    Hostname github.com\n \n    TCPKeepAlive yes\n    IdentitiesOnly yes\n\n \n \n 將上面的指令複製到白窗並另存config \n 到倉儲網頁新增金鑰(右上Settings) \n \n 點New SSH key \n 到tmp找到id_rsa.pub並用白窗開啟，複製內容到Key \n 並確認學號 \n \n \n 案Add SSH key \n 四、進行上傳 \n 方法一 \n 先進到scad2\xa0 →\xa0cd tmp/scad2 \n git add . \n git commit -m "此更新的主旨" \n git push \n 輸入帳號(學號) \n 輸入密碼 \n 方法二(啟用ssh) \n 要先改.git裡面的config \n [remote "origin"]把之前的https加上# \n \n 開啟putty(putty.exe)\xa0 \xa0將設定調好 \n 點github.com\xa0 案load \n 設定proxy(使用自家網路、手機網路請選None) \n 看你的網路連到哪一台 就打一樣的proxy \n 打開SSH裡面的Auth \n 選擇你所生產的金鑰檔案(.ppk) \n 回到session點選save再open \n \n 出現上圖就代表成功 \n 一樣先進到scad2\xa0 →\xa0cd tmp/scad2 \n git add . \n git commit -m "此更新的主旨" \n git push \n (此方法不需打帳號密碼) \n 方法三(啟用ssh) \n 使用資料夾的GitExtensions \n 點選GitExtensions.exe \n 修改設定 \n \n \n 確認正確以後\xa0 \xa0點OK \n 選擇Create new repository \n \n brown找到scad2資料夾後點Create \n 點tools→Git GUI \n \n 先點Stage Changed(=git add .) \n \n 案是 \n \n 案Continue \n \n 左下的框會出現資料 \n 然後右下的位置打上這次變更的主旨(= git commit -m "此更新的主旨" )可輸入中文 \n \n 點Commit→Push →Push \n \n 五、修改網頁標題 \n 打開資料夾找到init.py \n \n 使用白窗打開 \n \n 找到並修改成site_title = "學號 cad2020" \n file→save就可完成 \n 六、Zoomit \n 1、Ctrl+1:畫面放大+按下滑鼠進入畫畫模式( ESC能解除 ) \n 2、 Ctrl+2:進入畫畫模式(ESC能解除) \n 3、Ctrl+3:出現倒數的時間，休息時間剩多久(ESC能解除、Ctrl+3重置倒數時間) \n 4、 Ctrl+4:放大鏡(Ctrl+4 能解除) \n 5、畫畫模式:滑鼠直接畫任意線段、TAB+滑鼠滑動=畫圓、Shift+滑鼠滑動=畫直線 \n Ctrl+ 滑鼠滑動=畫矩形、Shift+Ctrl+滑鼠滑動=畫指線、Ctrl+T=打字 \n', 'tags': '', 'url': '筆記.html'}, {'title': '問題', 'text': '在倉儲github網站中，會發現少了downloads的資料夾 \n \n 需要做以下修改，並能解決問題 \n 將scad2裡的.gitignore裡面的downloads/刪除，並save \n \n 重新push後github就能有downloads了 \n \n 原因:gitignore會幫你忽視以下的檔案，為了防止他人能clone到你的某些檔案', 'tags': '', 'url': '問題.html'}]};